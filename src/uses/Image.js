import axios from "axios";
// import store from "../stores/stores";
export default function() {
  const uploadimage = async (data) => {
    var formData = new FormData();
    formData.append("fileUpload", data, data.name);
    try {
      await axios({
        method: "post",
        url: "fileuploads",
        data: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    uploadimage,
  };
}
