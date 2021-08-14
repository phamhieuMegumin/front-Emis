import axios from "axios";
import { useStore } from "vuex";
export default function() {
  const store = useStore();

  /**
   * Lấy danh sách lớp học
   */
  const getListClassroom = async () => {
    try {
      const data = await axios.get("classrooms");
      store.commit("CHANGE_CLASSROOM_LIST", data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const insertNewClassroom = async (classroom) => {
    try {
      await axios({
        method: "post",
        url: "/classrooms",
        data: classroom,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getListGrade = async () => {
    try {
      const data = await axios.get("/grades");
      store.commit("CHANGE_GRADE_LIST", data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getListClassroom,
    insertNewClassroom,
    getListGrade,
  };
}
