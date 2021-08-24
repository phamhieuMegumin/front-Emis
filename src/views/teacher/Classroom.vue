<template>
  <div class="classroom-container">
    <!-- Bắt đầu header -->
    <div class="header">
      <div class="title">Danh sách lớp đang quản lý</div>
      <div class="group-button">
        <el-button class="btn--gradient" @click="dialogVisible = true"
          >Tạo lớp</el-button
        >
      </div>
    </div>
    <!-- Kết thúc header -->
    <!-- Bắt đầu danh sách lớp học -->
    <div class="class-list-container">
      <card-item
        @changeInfo="changeInfo"
        v-for="(classInfo, index) in store.state.classroomList"
        :key="index"
        :classInfo="classInfo"
      />
    </div>
    <!-- Kết thúc danh sách lớp học -->
  </div>
  <!-- Bắt đầu dialog -->
  <el-dialog
    :title="titleDialog"
    v-model="dialogVisible"
    width="668px"
    :before-close="handleClose"
    :close-on-click-modal="false"
    @closed="handleCloseDialog"
    :destroy-on-close="true"
  >
    <!-- Bắt đầu Dialog main -->
    <el-form
      :model="classInfo"
      :rules="rules"
      ref="ruleForm"
      class="dialog-form"
      v-loading="store.state.loading"
    >
      <div class="container">
        <div class="dialog-content">
          <div class="content-left">
            <label class="image-container" for="imgSelect">
              <input
                class="imgSelect"
                type="file"
                @change="seletedFile"
                id="imgSelect"
              />
              <img
                :src="imagePreview"
                class="image-preview"
                v-if="imagePreview"
              />
              <img
                :src="
                  'https://localhost:44359/api/v1/FileUploads/' +
                    updateClassroomId
                "
                v-if="updateClassroomId"
                class="image-preview"
              />
              <!-- test end -->
            </label>
            <label for="imgSelect" class="change">Thay ảnh đại diện</label>
          </div>
        </div>
        <div class="content-right">
          <div class="row-2">
            <!-- Băt đầu input khối -->
            <div class="input-container">
              <label>Khối</label>
              <el-form-item prop="gradeId">
                <el-select
                  v-model="classInfo.gradeId"
                  filterable
                  placeholder="Chọn khối"
                >
                  <el-option
                    v-for="item in optionsGrade"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- Kết thúc select khối -->
            <!-- Bắt đầu bộ môn -->
            <div class="input-container">
              <label>Bộ môn</label>
              <el-form-item prop="subject">
                <el-select
                  v-model="classInfo.subject"
                  filterable
                  placeholder="Chọn môn học"
                  multiple
                >
                  <el-option
                    v-for="item in optionsSubject"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- Kết thúc bộ môn -->
          </div>
          <!-- Bắt đầu tên lớp -->
          <div class="input-container">
            <label>Tên lớp <span class="required">*</span></label>
            <el-form-item prop="classroomName">
              <el-input
                placeholder="Khối - Môn"
                v-model="classInfo.classroomName"
                autocomplete="off"
              />
            </el-form-item>
          </div>
          <!-- Kết thúc tên lớp -->
          <!-- Bắt đàu phần mô tả -->
          <div class="input-container">
            <label>Mô tả</label>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="Nhập mô tả (không bắt buộc)"
              v-model="classInfo.description"
              resize="none"
            >
            </el-input>
          </div>
          <!-- Kết thúc phần mô tả -->
          <!-- Bắt đầu phần phê duyệt học sinh -->
          <el-switch
            active-text="Bật phê duyệt học sinh vào lớp"
            inactive-color="#b6b9ce"
          >
          </el-switch>
          <!-- Kết thúc phê duyệt học sinh -->
        </div>
      </div>
    </el-form>
    <!-- Kết thúc dailog main -->

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Đóng</el-button>
        <el-button class="btn--gradient btn-group-left" @click="handleSave"
          >Lưu</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- Kết thúc dialog -->
</template>

<script>
import CardItem from "@/components/CardItem.vue";
import { ElMessageBox } from "element-plus";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import classroomContext from "../../uses/Classroom";
import NotificationContext from "../../uses/Notification";
import ImageContext from "../../uses/Image";
export default defineComponent({
  components: { CardItem },
  setup() {
    //#region Khai báo

    // Lấy các hàm API từ classroomContext
    const {
      getListClassroom,
      insertNewClassroom,
      getListGrade,
      getListSubject,
      insertNewManageSubject,
      getClassroomById,
      updateClassroom,
      updateManageSubject,
    } = classroomContext();

    // Lấy các hàm API từ ImageContext
    const { uploadimage, updateImage } = ImageContext();

    // Khai báo store
    const store = useStore();
    // Khai báo toastMessage
    const { successNotify } = NotificationContext();

    /**
     * Thông tin lớp học
     */
    const classInfo = reactive({
      gradeId: "",
      subject: [],
      classroomName: "",
      description: "",
      // approve: 0,
    });
    // Thực hiện có mở form xác nhận hay không
    const isConfirmDialog = ref(false);
    // Thay đổi title của dialog
    const titleDialog = ref("Tạo lớp mới");
    // Chế độ thêm mới hoặc cập nhật
    var updateMode = false;
    // ID lớp học cần sửa;
    const updateClassroomId = ref(null);

    // file hình ảnh lớp học
    const imageFile = ref("");

    const ruleForm = ref(null);
    /**
     *  Quy chuẩn kiểm tra form
     * CreatedBy : PQHieu(13/07/2021)
     */
    const rules = reactive({
      gradeId: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
      subject: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
      classroomName: [
        {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
        {
          required: true,
          message: "Không được để trống",
          trigger: "change",
        },
      ],
    });

    /**
     * Ẩn hiện dialog nhập
     * CreatedBy : PQHieu(13/07/2021)
     */
    const dialogVisible = ref(false);
    //#endregion

    //#region Các hàm chạy để lấy dữ liệu
    // Lấy danh sách lớp học
    getListClassroom();
    // Lấy danh sách các khối lớp
    getListGrade();
    // lấy danh sách các môn học
    getListSubject();
    //#endregion

    //#region Computed

    /**
     * Config danh sách khối học để tiến hành hiển thị
     * value : ID khối học
     * label : Tên khối học với ID tương ứng
     */
    const optionsGrade = computed(() => {
      const listGrade = store.state.gradeList.map((item) => {
        return {
          value: item.gradeId,
          label: `Khối ${item.gradeName}`,
        };
      });
      return listGrade;
    });

    /**
     * Config danh sách môn học để tiến hành hiển thị
     * value : ID môn học
     * label : Tên môn học với ID tương ứng
     */
    const optionsSubject = computed(() => {
      const listSubject = store.state.subjectList.map((item) => {
        return {
          value: item.subjectId,
          label: item.subjectName,
        };
      });
      return listSubject;
    });
    //#endregion

    //#region Watch
    // /**
    //  * Theo dõi giá trị của khối và bộ môn để thay đổi giá trị tên lớp
    //  * CreatedBy : PQhieu(13/07/2021)
    //  */
    watch(
      () => classInfo.gradeId,
      () => {
        classInfo.classroomName = createclassroomName();
        if (classInfo.gradeId.length > 0) isConfirmDialog.value = true;
      }
    );
    /**
     * Theo dõi thay đổi giá trị của danh sách môn học
     * CreatedBy: PQHieu(13/07/2021)
     */
    watch(
      () => classInfo.subject,
      () => {
        classInfo.classroomName = createclassroomName();
        if (classInfo.subject.length > 0) isConfirmDialog.value = true;
      }
    );
    watch(
      () => classInfo.description,
      () => {
        if (classInfo.description.length > 0) isConfirmDialog.value = true;
      }
    );
    watch(
      () => classInfo.classroomName,
      () => {
        if (classInfo.classroomName.length > 0) isConfirmDialog.value = true;
      }
    );
    //#endregion
    const imagePreview = ref(null);
    //#region Methods
    const seletedFile = async (event) => {
      imageFile.value = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    };

    /**
     *  Tự động tạo tên lớp dựa tên khối lớp và tên lớp
     * CreatedBy: PQHieu(14/07/2021)
     */
    const createclassroomName = () => {
      let newName = "";
      // Nếu tên khối lớp được lựa chọn trước
      // gán giá trị khối lớp cho tên lớp nếu khối lớp đã được chọn
      // Thực hiện chuyển đổi giá trị khối lớp từ ID sang tên
      for (let i = 0; i < optionsGrade.value.length; i++) {
        if (classInfo.gradeId == optionsGrade.value[i].value) {
          newName += optionsGrade.value[i].label;
        }
      }
      // thực hiện map giá trị của các môn học đã chọn thành tên lớp
      if (classInfo.subject.length > 0) {
        if (classInfo.gradeId) newName += " - "; // thêm dấu - nếu tên khối đã được chọn
        for (let i = 0; i < classInfo.subject.length; i++) {
          for (let j = 0; j < optionsSubject.value.length; j++) {
            if (classInfo.subject[i] == optionsSubject.value[j].value) {
              if (i != 0) newName += ", " + optionsSubject.value[j].label;
              else newName += optionsSubject.value[j].label; // không đặt dấu , ở môn học đầu tiên được chọn
            }
          }
        }
      }
      return newName;
    };

    /**
     * Thực hiện chỉnh sửa thông tin lớp học
     * CreatedBy : PQHieu(13/07/2021)
     */
    const changeInfo = async (classroomId) => {
      // Hiển thị dialog chỉnh sửa
      dialogVisible.value = true;
      // Đổi sang chế độ cập nhật
      updateMode = true;
      // Cập nhật ID lớp học cần sửa
      updateClassroomId.value = classroomId;
      // Thay đổi title dialog
      titleDialog.value = "Cập nhật lớp học";
      // Lấy thông tin lớp học
      await getClassroomById(classroomId);
      var newClassInfo = { ...store.state.classroomInfo };
      // Loại bỏ các thuộc tính trả về không cần thiết
      var configClassInfo = {
        gradeId: newClassInfo.gradeId,
        subject: [...newClassInfo.subject],
        classroomName: newClassInfo.classroomName,
        description: newClassInfo.description,
      };
      // Cập nhật lại thông tin lớp học để hiển thị
      Object.assign(classInfo, configClassInfo);
    };

    /**
     * Thực hiện xác nhận khi đóng dialog
     * CreatedBy : PQHieu(13/07/2021)
     */
    const handleClose = (done) => {
      // Chỉ thực hiện mở form xác nhận khi isConfirmDialog = true
      if (isConfirmDialog.value) {
        ElMessageBox.confirm("Bạn có muốn lưu trước khi rời đi không?", {
          title: "EMIS Ôn tập",
          showClose: false,
          dangerouslyUseHTMLString: true,
          confirmButtonText: "Lưu",
          cancelButtonText: "Không lưu",
          closeOnClickModal: false,
          confirmButtonClass: "btn--gradient btn-group-left",
        })
          .then(async () => {
            await handleSave();
            done();
          })
          .catch(() => {
            done();
          });
      } else {
        done();
      }
    };

    /**
     * Bắt sự kiện khi close dialog
     * CreatedBy : PQHieu(13/07/2021)
     */
    const handleCloseDialog = () => {
      // Thực hiện reset dialog
      Object.assign(classInfo, {
        gradeId: "",
        subject: [],
        classroomName: "",
        description: "",
      });
      // Thực hiện đặt lại kiểm tra có mở form xác nhận không
      isConfirmDialog.value = false;
      // Đóng chế độ cập nhật
      updateMode = false;
      // Hủy bỏ ID lớp học
      updateClassroomId.value = null;
      // Thay đổi title Dialog
      titleDialog.value = "Tạo lớp mới";
      // reset laị hình ảnh lớp học
      imagePreview.value = null;
    };

    /**
     * Thực hiện lưu dữ liệu
     */
    const handleSave = () => {
      ruleForm.value.validate(async (valid) => {
        if (valid) {
          // thực hiện khi check thành công
          try {
            const newClassroom = { ...classInfo, subject: null };
            store.commit("CHANGE_LOADING");
            if (!updateMode) {
              // Thêm mới lớp học
              await insertNewClassroom(newClassroom);
              // Thêm ảnh lớp học
              await uploadimage(imageFile.value);
            } else {
              // Cập nhật lớp học
              await updateClassroom(updateClassroomId.value, newClassroom);
              // Cập nhật ảnh lớp học
              await updateImage(updateClassroomId.value, imageFile.value);
            }
            // Config danh sách quản lý môn học
            var newListSubject = classInfo.subject.map((item) => {
              return {
                subjectId: item,
              };
            });
            if (!updateMode) {
              // Thêm mới quản lý lớp học
              await insertNewManageSubject(newListSubject);
            } else {
              // Cập nhật quản lý lớp học
              await updateManageSubject(
                updateClassroomId.value,
                newListSubject
              );
            }
            store.commit("CHANGE_LOADING");
            dialogVisible.value = false; // thực hiện đóng form
            // Thông báo thành công cho người dùng
            if (!updateMode) successNotify("Lớp học đã được tạo");
            else successNotify("Lớp học đã được cập nhật");
            // Load lại dữ liệu danh sách lớp học
            await getListClassroom();
          } catch (error) {
            store.commit("CHANGE_LOADING");
            console.log(error);
          }
        }
      });
    };
    //#endregion

    return {
      dialogVisible,
      handleClose,
      classInfo,
      optionsGrade,
      optionsSubject,
      rules,
      changeInfo,
      handleCloseDialog,
      ruleForm,
      handleSave,
      store,
      titleDialog,
      seletedFile,
      imagePreview,
      updateClassroomId,
    };
  },
});
</script>

<style scoped>
/* Css header */
.classroom-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 24px;
  padding-bottom: 24px;
}
.classroom-container .header {
  padding-top: 24px;
  width: 100%;
}
.classroom-container .header .title {
  float: left;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #4e5b6a;
  margin-bottom: 10px;
}
.classroom-container .header .group-button {
  float: right;
  margin-right: 6px;
}
/* Kết thúc css header */
/* Css khung chứa card */
.class-list-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-right: -12px;
  height: calc(100vh - 140px);
  overflow-y: auto;
}
/* Kết thúc css khung chứa card */
/* Dialog css */
.container {
  display: flex;
  justify-content: space-between;
}
.dialog-content {
  width: 221px;
  margin-right: 24px;
}

.image-container {
  display: block;
  border-radius: 10px;
  border: 1px solid rgb(182, 185, 206);
  width: 211px;
  height: 112px;
  overflow: hidden;
  cursor: pointer;
}
.imgSelect {
  display: none;
}
.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.container {
  margin-top: 0;
}
.change {
  display: block;
  font-weight: 500;
  color: rgb(138, 107, 246);
  margin-top: 12px;
  text-align: center;
  cursor: pointer;
}
.row-2 {
  display: flex;
}
.row-2 .input-container:nth-child(1) {
  margin-right: 12px;
  width: calc(33.33333% + 12px);
}
.row-2 .input-container:nth-child(2) {
  flex: 1;
}
.input-container {
  margin-bottom: 10px;
}
.input-container label {
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 2px;
  color: #4e5b6a;
}

.required {
  color: red;
}
/* Kết thúc css dialog */
</style>
