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
    getStudentsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateStudentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateStudentSuccess: (state, action) => {
      state.isFetching = false;
      state.students[
        state.students.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addStudentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addStudentSuccess: (state, action) => {
      state.isFetching = false;
      state.students.push(action.payload);
    },
    addStudentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
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
} = studentSlice.actions;

export default studentSlice.reducer;
