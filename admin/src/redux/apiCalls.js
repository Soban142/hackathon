import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods.js";
import {
  addStudentFailure,
  addStudentStart,
  addStudentSuccess,
  getStudentsFailure,
  getStudentsStart,
  getStudentsSuccess,
} from "./studentsRedux.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/signin", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getStudents = async (dispatch) => {
  dispatch(getStudentsStart());
  try {
    const res = await publicRequest.get("/users");
    console.log(res.data);
    dispatch(getStudentsSuccess(res.data));
  } catch (error) {
    dispatch(getStudentsFailure());
  }
};

export const addStudent = async (fields, dispatch) => {
  dispatch(addStudentStart());
  try {
    const res = await publicRequest.post("/auth/signup", fields);
    console.log(res.data);
    dispatch(addStudentSuccess(res.data));
  } catch (error) {
    dispatch(addStudentFailure());
  }
};
