import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios, { all } from "axios";
import { HomePageWrapper } from "./style/HomePageWrapper";
import { Box } from "@mui/material";
import Header from "../components/Header";
import { BoxLayoutWrapper } from "../utility/BoxLayoutWrapper";

// add a fetch api for url http://localhost:8080/api/v1/employee

const HomePage = () => {
  const [employeeArray, setEmployeeArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const columns = [
    { field: "employeeId", headerName: "ID", width: 100 },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Link
            style={{
              color: "black",
              textDecoration: "none",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
            to={"/ems/profile-page"}
            state={{ id: params.row.employeeId }}
          >
            {params.row.fullName}
          </Link>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "mobileNumber", headerName: "Mobile Number", width: 150 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
    {
      field: "action",
      headerName: "Action",
      flex: 1.5,
      renderCell: (params) => (
        <>
          <Link
            to={"/ems/update-employee"}
            state={{ employeeData: params.row }}
          >
            <Button
              variant="contained"
              to={`/employee/${params.row.employeeId}`}
            >
              Edit
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            sx={{ margin: "0 0 0 10px" }}
            onClick={() => deleteEmployee(params.row.employeeId)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  useEffect(() => {
    getAllEmployee();
  }, []);

  async function getAllEmployee() {
    setIsLoading(true);
    try {
      const axiosRes = await axios.get(`http://localhost:8080/api/v1/employee`);
      const apiRes = await axiosRes.data;
      const allEmployeeData = await apiRes.response;
      if (apiRes.status) {
        setEmployeeArray(allEmployeeData);
      }
      setEmployeeArray(allEmployeeData);
      setIsLoading(false);
      console.log("hi", employeeArray);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  async function deleteEmployee(idForDelete) {
    // alert("delete")
    setIsLoading(true);
    const axiosRes = await axios.delete(
      `http://localhost:8080/api/v1/employee/` + idForDelete
    );
    getAllEmployee();
  }

  console.log("out==>   ", employeeArray);

  return (
    <BoxLayoutWrapper>
      <HomePageWrapper>
        <div className="header-and-button">
          <Header title="EMPLOYEES" subtitle="List of Employees" />
          <Button
            component={Link}
            to="/ems/add-employee"
            variant="contained"
            color="primary"
            sx={{ margin: "20px 0 0 0 " }}
          >
            Add New Employee
          </Button>
        </div>
        <div>
          <div style={{ height: 400, width: "100%" }}>
            {/* <DataGrid rows={employeeArray} columns={columns} /> */}
            <Box mt="40px" height="75vh">
              <DataGrid
                // disableSelectionOnClick={true}
                loading={isLoading || !employeeArray}
                getRowId={(row) => {
                  console.log("row.employeeId---->", row.employeeId);
                  return row.employeeId;
                }}
                rows={employeeArray || []}
                columns={columns}
                checkboxSelection
                rowsPerPageOptions={[10, 50, 100]}
              />
            </Box>
          </div>
        </div>
      </HomePageWrapper>
    </BoxLayoutWrapper>
  );
};

export default HomePage;
