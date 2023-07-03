import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import manImage from "../asset/man.png";
import girlImage from "../asset/girl.png";
import { ProfilePageWrapper } from "./style/ProfilePageWrapper";
import { BoxLayoutWrapper } from "../utility/BoxLayoutWrapper";
import Header from "../components/Header";
import { useLocation } from "react-router";
import axios from "axios";

const ProfileContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
`;

const ProfileField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FieldLabel = styled(Typography)`
  font-weight: bold;
  width: 150px;
`;

const FieldValue = styled(Typography)`
  flex-grow: 1;
`;

const ProfilePage = () => {
  const [employee, setEmployee] = useState(null);
  const routeLocation = useLocation();
  const useLocationData = routeLocation.state;
 

  useEffect(() => {
    // Simulating API call with the provided response data
    const fetchEmployeeData = async () => {
      console.log("useLocationData",useLocationData.id)
      const axiosRes = await axios.get(`http://localhost:8080/api/v1/employee/`+useLocationData.id);
      const apiRes = axiosRes.data;
      const employeeData = apiRes.response;
      setEmployee(employeeData);
    };

    fetchEmployeeData();
  }, []);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <BoxLayoutWrapper>
      <ProfilePageWrapper>
        <div className="header-and-button">
          <Header title="Employee Detail" subtitle="Detail of Employee" />
          <ProfileContainer>
            <div className="profile-img">
              <img src={employee.gender=="male"?manImage:girlImage} />
            </div>

            <ProfileField>
              <FieldLabel>Employee ID:</FieldLabel>
              <FieldValue>{employee.employeeId}</FieldValue>
            </ProfileField>
            <ProfileField>
              <FieldLabel>Full Name:</FieldLabel>
              <FieldValue>{employee.fullName}</FieldValue>
            </ProfileField>
            <ProfileField>
              <FieldLabel>Email:</FieldLabel>
              <FieldValue>{employee.email}</FieldValue>
            </ProfileField>
            <ProfileField>
              <FieldLabel>Mobile Number:</FieldLabel>
              <FieldValue>{employee.mobileNumber}</FieldValue>
            </ProfileField>
            <ProfileField>
              <FieldLabel>Gender:</FieldLabel>
              <FieldValue>{employee.gender}</FieldValue>
            </ProfileField>
            <ProfileField>
              <FieldLabel>Date of Birth:</FieldLabel>
              <FieldValue>{employee.dateOfBirth}</FieldValue>
            </ProfileField>
          </ProfileContainer>
        </div>
      </ProfilePageWrapper>
    </BoxLayoutWrapper>
  );
};

export default ProfilePage;
