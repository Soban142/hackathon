import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUserAttendance: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    getAttendance: (state, action) => {
      state.currentUserAttendance = action.payload;
    },
    markAttendance: (state, action) => {
      state.currentUserAttendance = action.payload;
    },
  },
});

export const { getAttendance, markAttendance } = attendanceSlice.actions;

export default attendanceSlice.reducer;
