import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { message } from "antd";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
var emailarray = [];

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 100,
    renderCell: (params) => (
      <Link to={`/student/dashboard/view-profile/${params.row._id}`}>
        <Avatar
          alt="Travis Howard"
          src={`http://localhost:8080/uploads/profileimages/${params.row.photourl}`}
        />
      </Link>
    ),
  },
  {
    field: "user",
    headerName: "Name",
    valueGetter: (params) => params.row.user.name,
    width: 200,
  },
  {
    field: "user",
    headerName: "Email",
    valueGetter: (params) => params.row.user.email,
    width: 300,
  },

  { field: "branch", headerName: "Branch", width: 200 },
  { field: "engineering_division", headerName: "Division", width: 130 },
  { field: "engineeringAggrpercent", headerName: "Aggr CGPA", width: 150 },
  { field: "engineeringpercent", headerName: "Eng Aggr %", width: 170 },

  {
    field: "action",
    headerName: "Action",
    width: "130",
    renderCell: (params) => (
      <Link to={`/student/dashboard/edit-student/${params.row._id}`}>
        <EditIcon />
      </Link>
    ),
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
// doc_id name company_name package
const AllStudentsTable = () => {
  const [loading, setLoading] = useAuth();

  const [rows, setRows] = React.useState([]); //all students

  const getAllStudents = async () => {
    await axios
      .get("http://localhost:8080/api/v1/admin/get-allstudents/")
      .then((res) => {
        console.log(res.data);
        setRows(res.data.allstudents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
      <section className="col-11 mx-auto">
        <h4 style={{ color: "var(--form-heading-color)" }}>
          All Students List
        </h4>
        <DataGrid
          style={{ height: 400, width: "100%" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row._id}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </section>
    </>
  );
};

export default AllStudentsTable;
