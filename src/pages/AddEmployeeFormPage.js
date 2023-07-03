import React from "react";

import * as Yup from "yup";
import styled from "styled-components";
import { Button, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import { BoxLayoutWrapper } from "../utility/BoxLayoutWrapper";
import { AddEmployeeFormPageWrapper } from "./style/AddEmployeeFormPageWrapper";

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
`;

const FormField = styled.div`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const AddEmployeeFormPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    employeeId: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobileNumber: Yup.string()
      .matches(/^\d+$/, "Invalid mobile number")
      .required("Required"),
    gender: Yup.string().required("Required"),
    dateOfBirth: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    const postEmployeeData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/employee",
          values
        );
        if (response.data.status) {
          navigate("/ems");
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    postEmployeeData();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  console.log("formik.error", formik.errors);
  console.log("formik.values.", formik.values);

  return (
    <>
      <BoxLayoutWrapper>
      
          <AddEmployeeFormPageWrapper>
              <div className="header-and-button">
            <Header title="Create Employee" subtitle="Fill all the Details of Employee" />
            </div>
            <FormContainer onSubmit={formik.handleSubmit}>
              <FormField>
                <TextField
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </FormField>
              <FormField>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormField>
              <FormField>
                <TextField
                  id="mobileNumber"
                  name="mobileNumber"
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.mobileNumber &&
                    Boolean(formik.errors.mobileNumber)
                  }
                  helperText={
                    formik.touched.mobileNumber && formik.errors.mobileNumber
                  }
                />
              </FormField>
              {/* <FormField>
        <TextField
          id="gender"
          name="gender"
          label="Gender"
          variant="outlined"
          fullWidth
          value={formik.values.gender}
          onChange={formik.handleChange}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
        />
      </FormField> */}
              <FormField>
                <TextField
                  id="gender"
                  name="gender"
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  select
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </FormField>

              <FormField>
                <TextField
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth)
                  }
                  helperText={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
                />
              </FormField>
              <ButtonContainer>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </ButtonContainer>
            </FormContainer>
          </AddEmployeeFormPageWrapper>
       
      </BoxLayoutWrapper>
    </>
  );
};

export default AddEmployeeFormPage;
