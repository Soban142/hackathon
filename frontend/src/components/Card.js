import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { request } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { getAttendance, markAttendance } from "../redux/slices/attendanceSlice";
import { format } from "date-fns";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  margin-top: 5rem;
`;

const ContentWrapper = styled.div`
  /* display: flex; */
  /* justify-content: space-around; */

  box-shadow: 0px 0px 58px -20px blueviolet;
  width: 600px;
  height: 550px;
  padding: 20px 40px;
`;

// const ContentLeft = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: fit-content;
//   gap: 10px;
//   background: #3453cf;
//   background: linear-gradient(to right, #3453cf 0%, #f6c2fc 100%);
//   /* width: 100%; */
// `;

const ContentHeading = styled.h3`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.1;
  color: rgba(0, 0, 0, 0.5);
`;

const ContentBody = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const Content = styled.div`
  margin-top: 16px;
  line-height: 2;
`;

const Button = styled.button`
  /* margin-left: 200px; */
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  color: white;
  background-color: rgb(0, 150, 255);
  margin-top: 20px;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
`;

const Congratulation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  width: 400px;
  height: 100px;
  background-color: #b3ea9a;
  margin: 10px auto;
`;

const Card = () => {
  const user = useSelector((state) => state.user.currentUser);
  const attendance = useSelector(
    (state) => state.attendance.currentUserAttendance
  );
  console.log(user);
  const dispatch = useDispatch();

  const [attendeeLocation, setAttendeeLocation] = useState(null);
  const [isAttendance, setIsAttendance] = useState(false);

  useEffect(() => {
    const userAttendance = async () => {
      const attendanceData = await request.get(`/attendances/find/${user._id}`);
      if (attendanceData) {
        dispatch(getAttendance(attendanceData.data));
      }
      return;
    };
    userAttendance();
  }, [user?._id]);

  useLayoutEffect(() => {
    if (attendance?.checkIn?.isCheckedIn && attendance?.checkOut.isCheckedOut)
      return setIsAttendance(true);
  }, [attendance?.checkOut?.isCheckedOut]);
  console.log(isAttendance);

  useEffect(() => {
    function success(position) {
      const { latitude, longitude } = position.coords;
      setAttendeeLocation({
        latitude,
        longitude,
      });
      // console.log(
      //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=`
      // );
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => success(position));
    }
  }, [navigator.geolocation]);
  console.log(attendeeLocation);

  async function handleClick(attendanceState) {
    try {
      // setIsAttendance(true);

      const attendanceData =
        attendanceState === "in"
          ? await request.post("/attendances/checkin", {
              id: `${user._id}`,
              location: attendeeLocation,
            })
          : await request.put("/attendances/checkout", {
              id: `${user._id}`,
            });
      dispatch(markAttendance(attendanceData.data));
      // setIsAttendance(false);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(attendance);

  return (
    <Container>
      <ContentWrapper>
        <Content>
          <ContentHeading>ID</ContentHeading>
          <ContentBody>{user?._id}</ContentBody>
        </Content>
        <Content>
          <ContentHeading>Course</ContentHeading>
          <ContentBody>{user?.course}</ContentBody>
        </Content>
        <Content>
          <ContentHeading>Check In Time</ContentHeading>
          <ContentBody>
            {attendance?.checkIn?.isCheckedIn
              ? format(attendance?.checkIn?.time, "dd-MM-yyyy hh:mm aaaaa'm'")
              : "----"}
          </ContentBody>
        </Content>
        <Content>
          <ContentHeading>Check Out Time</ContentHeading>
          <ContentBody>
            {attendance?.checkOut?.isCheckedOut
              ? format(attendance?.checkOut?.time, "dd-MM-yyyy hh:mm aaaaa'm'")
              : "----"}
          </ContentBody>
        </Content>
        {isAttendance ? (
          <Congratulation>
            Your attendance of today has been marked!
          </Congratulation>
        ) : !attendance?.checkIn?.isCheckedIn ? (
          <Button onClick={() => handleClick("in")} disabled={isAttendance}>
            Check In
          </Button>
        ) : (
          <Button onClick={() => handleClick("out")} disabled={isAttendance}>
            Check Out
          </Button>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default Card;
