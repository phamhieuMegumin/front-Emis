/* eslint-disable */
import { ElNotification } from "element-plus";

export default function() {
  const successNotify = (message) => {
    ElNotification({
      title: "Success",
      message: message,
      type: "success",
      duration: 3000,
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
