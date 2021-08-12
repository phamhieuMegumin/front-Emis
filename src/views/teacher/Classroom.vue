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
        v-for="(item, index) in [1, 2, 3, 4, 5]"
        :key="index"
      />
    </div>
    <!-- Kết thúc danh sách lớp học -->
  </div>
  <!-- Bắt đầu dialog -->
  <el-dialog
    title="Tạo lớp mới"
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
    >
      <div class="container">
        <div class="dialog-content">
          <div class="content-left">
            <div class="image-container">
              <img src="" />
            </div>
            <div class="change">Thay ảnh đại diện</div>
          </div>
        </div>
        <div class="content-right">
          <div class="row-2">
            <!-- Băt đầu input khối -->
            <div class="input-container">
              <label>Khối</label>
              <el-form-item prop="grade">
                <el-select
                  v-model="classInfo.grade"
                  filterable
                  placeholder="Chọn khối"
                >
                  <el-option
                    v-for="item in options"
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
            <el-form-item prop="className">
              <el-input
                placeholder="Khối - Môn"
                v-model="classInfo.className"
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
            v-model="classInfo.isapprove"
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
import { defineComponent, reactive, ref, watch } from "vue";

export default defineComponent({
  components: { CardItem },
  setup() {
    /**
     * Thông tin lớp học
     */
    const classInfo = reactive({
      grade: "",
      subject: [],
      className: "",
      description: "",
      isapprove: false,
    });
    // Thực hiện có mở form xác nhận hay không
    const isConfirmDialog = ref(false);
    const ruleForm = ref(null);
    /**
     *  Quy chuẩn kiểm tra form
     * CreatedBy : PQHieu(13/07/2021)
     */
    const rules = reactive({
      grade: [
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
      className: [
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
     * Mẫu thử option
     */
    const options = ref([
      {
        value: "6",
        label: "Khối 6",
      },
      {
        value: "7",
        label: "Khối 7",
      },
      {
        value: "8",
        label: "Khối 8",
      },
    ]);
    const optionsSubject = ref([
      {
        value: "0",
        label: "Toán",
      },
      {
        value: "1",
        label: "Lý",
      },
      {
        value: "2",
        label: "Hóa",
      },
    ]);
    /**
     * Ẩn hiện dialog nhập
     * CreatedBy : PQHieu(13/07/2021)
     */
    const dialogVisible = ref(false);

    // /**
    //  * Theo dõi giá trị của khối và bộ môn để thay đổi giá trị tên lớp
    //  * CreatedBy : PQhieu(13/07/2021)
    //  */
    watch(
      () => classInfo.grade,
      () => {
        classInfo.className = createClassName();
      }
    );
    /**
     * Theo dõi thay đổi giá trị của danh sách môn học
     * CreatedBy: PQHieu(13/07/2021)
     */
    watch(
      () => classInfo.subject,
      () => {
        classInfo.className = createClassName();
      }
    );
    watch(classInfo, () => {
      isConfirmDialog.value = true;
    });
    /**
     *  Tự động tạo tên lớp dựa tên khối lớp và tên lớp
     * CreatedBy: PQHieu(14/07/2021)
     */
    const createClassName = () => {
      let newName = "";
      // Nếu tên khối lớp được lựa chọn trước
      newName += classInfo.grade; // gán giá trị khối lớp cho tên lớp nếu khối lớp đã được chọn
      // thực hiện map giá trị của các môn học đã chọn thành tên lớp
      if (classInfo.subject.length > 0) {
        if (classInfo.grade) newName += " - "; // thêm dấu - nếu tên khối đã được chọn
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
    const changeInfo = () => {
      dialogVisible.value = true;
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
          .then(() => {
            console.log("Done");
            // done();
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
        grade: "",
        subject: [],
        className: "",
        description: "",
      });
      // Thực hiện đặt lại kiểm tra có mở form xác nhận không
      isConfirmDialog.value = false;
    };
    /**
     * Thực hiện lưu dữ liệu
     */
    const handleSave = () => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          // thực hiện khi check thành công
          dialogVisible.value = false; // thực hiện đóng form
        }
      });
    };

    return {
      dialogVisible,
      handleClose,
      classInfo,
      options,
      optionsSubject,
      rules,
      changeInfo,
      handleCloseDialog,
      ruleForm,
      handleSave,
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
  border-radius: 10px;
  border: 1px solid rgb(182, 185, 206);
  width: 211px;
  height: 112px;
  overflow: hidden;
}
.container {
  margin-top: 0;
}
.change {
  font-weight: 500;
  color: rgb(138, 107, 246);
  margin-top: 12px;
  text-align: center;
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
