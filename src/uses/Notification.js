/* eslint-disable */
import { ElNotification } from "element-plus";

export default function() {
  const successNotify = () => {
    ElNotification({
      title: "Success",
      message: "Thêm thành công",
      type: "success",
      duration: 1000,
    });
  };
  const errorNotify = (message) => {
    ElNotification({
      title: "Error",
      message: message,
      type: "error",
      duration: 3000,
    });
  };
  return {
    successNotify,
    errorNotify,
  };
}
