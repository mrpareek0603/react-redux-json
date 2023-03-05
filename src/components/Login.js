
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from 'axios';
// import ErrorHandler from './ErrorHandler';
import { Link } from 'react-router-dom';
// import { ErrorBoundary } from 'react-error-boundary';

// import './style.css'
function LoginForm({ name }) {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [hasError, setHasError] = useState(false);
    // const [isLoggedin, setIsLoggedin] = useState(false);
    const history = useHistory()

    const handleInputChange = (e) => {
        setHasError(true);
        const { name, value } = e.target;
        console.log(name + ' ' + value);
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }

    }

    // when Login button is clicked validate the input and made the axios call
    const handleSubmit = async (e) => {
        e.preventDefault();
        // validate the form
        if (email === " " || password === " ") {
            alert(`input fields can't be null`)
        }
        const userInfo = {
            email, password
        }
        // make call to json server to check if the email exists in the db
        try {
            const url = `http://localhost:5000/userInfo?email=${email}`;
            let urlData = await axios.get(url, userInfo);
            // if the array has 0 elements means no data found for the email 
            if (urlData.data.length === 0) {
                alert('No user with this email exists');
            } else if (password === urlData.data[0].password) {
                // if password matches then save in localstorage untill logout
                // and redirect to homedashboard
                localStorage.setItem('token-info', JSON.stringify(userInfo));
                history.push("/home");
            }
            else if (password !== urlData.data[0].password) {
                alert("Wrong Password");
            }
        } catch (error) {
            console.log(`error in handleSUbmit while login ${error}`);
            setHasError(true);
            throw new Error("error while axios call")
        }
    }
    return (
        <div>
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
                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    name="email"
                    value={email || ""}
                    type="email"
                    onChange={handleInputChange}
                />
                <TextField
                    id="standard"
                    label="Password"
                    variant="standard"
                    name="password"
                    value={password || ""}
                    type="password"
                    onChange={handleInputChange}
                />
                <Button
                    style={{ width: "100px" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    LogIn
                </Button>
                <Link to="/">
                    <Button
                        style={{ width: "100px" }}
                        variant="contained"
                        color="secondary"
                    >
                        Register?
                    </Button>
                </Link>
            </Box>
        </div>
    )
}

export default LoginForm