import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import { useHistory } from "react-router";
// skipping buttonStyles in video at 38 minutes Rohan
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 900,
  },
});
const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const Home = () => {
  const classes = useStyles();
  const buttonStyles = useButtonStyles();

  // useDispatch is a hook to access the redux dispatch function.
  let dispatch = useDispatch();
  let history = useHistory();
  // useSelector is a hook to access the redux store's state. This hook takes a selector function as
  // an argument. The selector is called with the store state.
  const { users } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete the user ?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div className={classes.table}>
      <div
        className={buttonStyles.root}
        style={{ marginBottom: "100px" }}
        onClick={() => history.push("/addUser")}
      >
        <Button variant="contained" color="primary">
          Add User
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className={buttonStyles.root}>
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <Button
                          style={{ marginRight: "5px" }}
                          color="secondary"
                          onClick={() => handleDelete(user.id)}
                        >
                          DELETE
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => history.push(`/editUser/${user.id}`)}
                        >
                          EDIT
                        </Button>
                      </ButtonGroup>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
