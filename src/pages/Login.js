
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from 'axios';
import ErrorHandler from './ErrorHandler';
import { Link } from 'react-router-dom';

// import './style.css'
function LoginForm() {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [hasError, setHasError] = useState(false);
    // const [isLoggedin, setIsLoggedin] = useState(false);
    const history = useHistory()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === " " || password === " ") {
            alert(`input fields can't be null`)
        }
        const userInfo = {
            email, password
        }
        try {
            const url = `http://localhost:5000/userInfo?email=${email}`;
            let urlData = await axios.get(url, userInfo);
            if (urlData.data.length === 0) {
                alert('No user with this email exists');
            } else if (password === urlData.data[0].password) {
                localStorage.setItem('token-info', JSON.stringify(userInfo));
                // setIsLoggedin(true);
                history.push("/home");
            }
            else if (password !== urlData.data[0].password) {
                alert("Wrong Password");
            }
        } catch (error) {
            console.log(`error in handleSUbmit while login ${error}`);
            setHasError(error);
        }
    }


    return (
        <div>
            {!hasError && (
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
            )}
            {hasError && <ErrorHandler error={hasError}></ErrorHandler>}

        </div>

    )

}

export default LoginForm