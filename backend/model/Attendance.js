import mongoose from "mongoose";
const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    date: {
      type: Date,
      default: () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00:000
        return currentDate;
      },
    },
    userId: {
      type: String,
      required: true,
    },
    checkIn: {
      time: {
        type: Date,
      },
      isCheckedIn: {
        type: Boolean,
        default: false,
      },
    },
    checkOut: {
      time: {
        type: Date,
      },
      isCheckedOut: {
        type: Boolean,
        default: false,
      },
    },
    attendeeLocation: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
