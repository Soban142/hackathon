import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getStudentsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getStudentsSuccess: (state, action) => {
      state.isFetching = false;
      state.students = action.payload;
    },
    getStudentsFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    updateStudentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateStudentSuccess: (state, action) => {
      state.isFetching = false;
      state.students[
        state.students.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.student;
    },
    updateStudentFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    addStudentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addStudentSuccess: (state, action) => {
      state.isFetching = false;
      state.students.push(action.payload);
    },
    addStudentFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  getStudentsFailure,
  getStudentsSuccess,
  getStudentsStart,
  addStudentStart,
  addStudentSuccess,
  addStudentFailure,
  updateStudentStart,
  updateStudentSuccess,
  updateStudentFailure,
} = studentSlice.actions;

export default studentSlice.reducer;
