import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";
import ErrorHandler from './ErrorHandler';

const AddUser = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");

  const history = useHistory();
  let dispatch = useDispatch();
  const { name, email, contact, address } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !address || !contact) {
      setError("Please fill all the input fields correctly");
    } else {
      dispatch(addUser(state));
      history.push("/home");
      setError("");
    }
  };
  const loggedIn = localStorage.getItem('token-info');

  try {
    return (
      <div>
        {loggedIn && (
          <Box
            component="form"
            sx={{
              marginTop: "100px",
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Button
              style={{ width: "100px", marginTop: "20px" }}
              variant="contained"
              color="secondary"
              onClick={() => {
                history.push("/home");
              }}
            >
              Go Back
            </Button>
            <h2>Add User</h2>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              name="name"
              value={name}
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              value={email}
              type="email"
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Contact"
              variant="standard"
              name="contact"
              value={contact}
              type="number"
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Address"
              variant="standard"
              name="address"
              value={address}
              type="text"
              onChange={handleInputChange}
            />
            <br />
            <Button
              style={{ width: "100px" }}
              variant="contained"
              color="primary"
              type="submit"
              onChange={handleInputChange}
            >
              Submit
            </Button>
          </Box>
        )}
        {!loggedIn && (
          <>
            <h1>
              Add User Page
            </h1>
            <h4>
              You need to login first, to see the content!
            </h4>
          </>
        )}
      </div>

    );
  } catch (error) {
    return <ErrorHandler error={error} />
  }

};

export default AddUser;
