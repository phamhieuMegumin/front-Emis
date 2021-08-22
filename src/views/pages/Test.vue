<template>
  <div>
    <input type="file" @change="seletedFile" />
    <button @click="upLoad">Submit</button>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  setup() {
    const data = ref(null);
    const seletedFile = (event) => {
      data.value = event.target.files[0];
    };
    const upLoad = async () => {
      try {
        var fd = new FormData();
        fd.append("fileUpload", data.value, data.value.name);
        const reqdata = {
          fileUpload: fd,
        };
        console.log(reqdata);
        axios.post("https://localhost:44359/api/v1/fileuploads", fd);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      seletedFile,
      upLoad,
    };
  },
};
</script>

<style lang="scss" scoped></style>
