import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendances: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getAttendancesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAttendancesSuccess: (state, action) => {
      state.isFetching = false;
      state.attendances = action.payload;
    },
    getAttendancesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAttendancesStart,
  getAttendancesSuccess,
  getAttendancesFailure,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
