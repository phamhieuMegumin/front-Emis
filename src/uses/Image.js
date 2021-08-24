import axios from "axios";
// import store from "../stores/stores";
export default function() {
  const uploadimage = async (data) => {
    var formData = new FormData();
    formData.append("fileUpload", data, data.name);
    await axios({
      method: "post",
      url: "fileuploads",
      data: formData,
    });
  };
  const updateImage = async (classId, data) => {
    var formData = new FormData();
    formData.append("fileUpload", data, data.name);
    await axios({
      method: "put",
      url: `fileuploads/${classId}`,
      data: formData,
    });
  };
  return {
    uploadimage,
    updateImage,
  };
}
