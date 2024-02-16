import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods.js";
import {
  addStudentFailure,
  addStudentStart,
  addStudentSuccess,
  getStudentsFailure,
  getStudentsStart,
  getStudentsSuccess,
  updateStudentFailure,
  updateStudentStart,
  updateStudentSuccess,
} from "./studentsRedux.js";
import {
  getAttendancesFailure,
  getAttendancesStart,
  getAttendancesSuccess,
} from "./attendanceRedux.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/signin", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure());
  }
};

export const getStudents = async (dispatch) => {
  dispatch(getStudentsStart());
  try {
    const res = await userRequest.get("/students");
    console.log(res.data);
    dispatch(getStudentsSuccess(res.data));
  } catch (error) {
    console.log(error.response.data);
    dispatch(getStudentsFailure(error.response.data));
  }
};

export const addStudent = async (fromData, dispatch) => {
  dispatch(addStudentStart());
  try {
    const res = await userRequest.post("/students/registerStudent", fromData);
    console.log(res.data);
    dispatch(addStudentSuccess(res.data));
  } catch (error) {
    dispatch(addStudentFailure());
  }
};

// Attendance's requests

export const getAttendance = async (dispatch) => {
  dispatch(getAttendancesStart());
  try {
    const res = await userRequest.get("/attendances");
    console.log(res.data);
    dispatch(getAttendancesSuccess(res.data));
  } catch (error) {
    dispatch(getAttendancesFailure());
  }
};

export const updateStudent = async (id, student, dispatch) => {
  dispatch(updateStudentStart());
  try {
    const res = await userRequest.put(`/students/${id}`, student);
    console.log(res.data);
    dispatch(updateStudentSuccess(res.data));
  } catch (error) {
    dispatch(updateStudentFailure());
  }
};
