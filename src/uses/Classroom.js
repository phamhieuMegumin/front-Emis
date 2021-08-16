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
    await axios({
      method: "post",
      url: "/classrooms",
      data: classroom,
    });
  };

  const insertNewManageSubject = async (listSubject) => {
    await axios({
      method: "post",
      url: "/manageSubjects/insertList",
      data: listSubject,
    });
  };

  const getListGrade = async () => {
    try {
      const data = await axios.get("/grades");
      store.commit("CHANGE_GRADE_LIST", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getListSubject = async () => {
    try {
      const data = await axios.get("/subjects");
      store.commit("CHANGE_SUBJECT_LIST", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClassroomById = async (classroomId) => {
    try {
      const data = await axios({
        method: "get",
        url: `/classrooms/${classroomId}`,
      });
      store.commit("CHANGE_CLASSROOM_INFO", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClassroom = async (classroomId) => {
    await axios.delete(`/classrooms/${classroomId}`);
  };
  return {
    getListClassroom,
    insertNewClassroom,
    getListGrade,
    getListSubject,
    insertNewManageSubject,
    getClassroomById,
    deleteClassroom,
  };
}
