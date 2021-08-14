<template>
  <div class="class-item-wrapper">
    <div class="class-item-content">
      <!-- ảnh thumbnail -->
      <div class="thumbnail">
        <div class="thumbnail-wrapper"></div>
      </div>
      <!-- Kết thúc ảnh thumbnail -->
      <!-- Bắt đầu phần thông tin card -->
      <div class="description">
        <div class="info-class">
          <div class="class-name">{{ classInfo.classroomName }}</div>
          <div class="more-info">{{ 0 }} Học sinh</div>
        </div>
        <div class="line"></div>
        <div class="bottom">
          <div class="class-code">
            Mã lớp - Q76E76
            <img
              src="https://testqlthapp.misacdn.net/r/ontap/img/ic_zoom.e5a06701.svg"
              width="34"
              height="34"
            />
          </div>
          <!---->
        </div>
        <!-- Bắt đầu proper -->

        <el-popover
          placement="left-start"
          :width="200"
          trigger="click"
          :show-arrow="false"
          :offset="-10"
        >
          <div class="popover-option-container">
            <div class="option-item" @click="handleChangeinfo">
              Chỉnh sửa thông tin lớp
            </div>
            <div class="option-item">Ngừng theo dõi</div>
            <div class="option-item">Xóa lớp</div>
          </div>
          <template #reference>
            <div class="button-more">
              <img
                src="https://testqlthapp.misacdn.net/r/ontap/img/ic_AnswerMore.38ee007c.svg"
                width="10"
                height="20"
              />
            </div>
          </template>
        </el-popover>
        <!-- Kết thúc proper -->
      </div>
      <!-- Kết thúc phần thông tin card -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["classInfo"],
  setup(props, context) {
    /**
     * Bắt sự kiện thay đổi thông tin lớp học
     * CreatedBy : PQhieu(13/07/2021)
     */
    const handleChangeinfo = () => {
      context.emit("changeInfo");
    };
    return {
      handleChangeinfo,
    };
  },
};
</script>

<style scoped>
/* Css class card */

.class-item-wrapper {
  width: 25%;
  min-width: 300px;
  height: auto;
  padding-left: 12px;
  padding-right: 12px;
  position: relative;
  display: block;
  margin-top: 24px;
}
.class-item-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 9px rgb(90 125 141 / 16%);
  color: #62768e;
  height: 274px;
  overflow: hidden;
}
.thumbnail-wrapper {
  height: 150px;
  background: url("https://testqlthapp.misacdn.net/r/ontap/img/toan.10218e68.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}
.thumbnail {
  display: block;
  z-index: 1;
  height: 146px;
  overflow: hidden;
}
.description {
  position: relative;
  width: 100%;
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
}
.class-name {
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  padding-right: 12px;
  color: #4e5b6a;
}
.line {
  height: 1px;
  background-color: #dcdfe6;
  border-bottom-left-radius: 100%;
  border-top-right-radius: 100%;
  margin: 8px 0;
}
.description .info-class .more-info {
  font-size: 14px;
  line-height: 20px;
  padding-top: 4px;
  font-weight: 500;
  text-transform: lowercase;
}
.class-item-wrapper .description .bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.class-item-wrapper .description .bottom .class-code {
  display: flex;
  align-items: center;
  line-height: 34px;
  color: #4e5b6a;
}
.class-item-wrapper .description .button-more {
  position: absolute;
  width: 36px;
  height: 40px;
  margin: 8px 4px 0 0;
  top: 0;
  right: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Kết thúc class card */
/* Css popover content */
/* Kết thúc css popover content */
.popover-option-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 12px;
}
.popover-option-container .option-item {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
}
.popover-option-container .option-item:hover {
  color: #8a6bf6;
}
/* Bắt đầu thông tin mã lớp */
.description .bottom .class-code img {
  margin-left: 4px;
  cursor: pointer;
}
/* Kết thúc thông tin mã lớp */
</style>
