import Attendance from "../model/Attendance.js";

const checkIn = async (req, res, next) => {
  console.log(req.body.location);
  try {
    const attendance = await Attendance.create({
      userId: req.body?.id,
      checkIn: {
        time: new Date(),
        isCheckedIn: true,
      },
      attendeeLocation: req.body?.location,
    });
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

const checkOut = async (req, res, next) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  console.log(date);

  const studentAttendance = await Attendance.findOneAndUpdate(
    {
      userId: req.body?.id,
      date: date,
    },
    {
      $set: {
        checkOut: {
          time: new Date(),
          isCheckedOut: true,
        },
      },
    },
    { new: true }
  );
  // const filteredAttendance = studentAttendance[0];
  //  studentAttendance.filter(
  //   (student) => student.date.toDateString() === date.toDateString()
  //  );
  // console.log(filteredAttendance);
  res.status(200).json(studentAttendance);
};

const getAttendance = async (req, res) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  console.log(date);

  const studentAttendance = await Attendance.findOne({
    userId: req.params?.id,
    date: date,
  });
  // const filteredAttendance = studentAttendance[0];
  //  studentAttendance.filter(
  //   (student) => student.date.toDateString() === date.toDateString()
  //  );
  // console.log(filteredAttendance);
  res.status(200).json(studentAttendance);
};

const getAllAttendances = async (req, res, next) => {
  try {
    const studentAttendances = await Attendance.find();
    res.status(200).json(studentAttendances);
  } catch (error) {
    next(error);
  }
};

export { checkIn, checkOut, getAttendance, getAllAttendances };
