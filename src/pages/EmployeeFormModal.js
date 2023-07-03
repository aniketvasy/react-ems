import React from 'react';
import { Modal, Box } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  fullname: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobilenumber: Yup.string().required('Mobile Number is required'),
  gender: Yup.string().required('Gender is required'),
  dateofbirth: Yup.string().required('Date of Birth is required'),
});

const EmployeeFormModal = ({ isOpen, onClose }) => {
  const initialValues = {
    fullname: '',
    email: '',
    mobilenumber: '',
    gender: '',
    dateofbirth: '',
  };

  const handleSubmit = (values) => {
    // Handle form submission (e.g., sending data to the server)
    console.log(values);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, width: 400 }}>
        <h2>Add New Employee</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div>
              <label htmlFor="fullname">Full Name:</label>
              <Field type="text" id="fullname" name="fullname" />
              <ErrorMessage name="fullname" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="mobilenumber">Mobile Number:</label>
              <Field type="text" id="mobilenumber" name="mobilenumber" />
              <ErrorMessage name="mobilenumber" component="div" />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <Field as="select" id="gender" name="gender">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" />
            </div>
            <div>
              <label htmlFor="dateofbirth">Date of Birth:</label>
              <Field type="date" id="dateofbirth" name="dateofbirth" />
              <ErrorMessage name="dateofbirth" component="div" />
            </div>
            <div>
              <button type="submit">Add Employee</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default EmployeeFormModal;
