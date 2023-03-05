
import React, { useState } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import ErrorHandler from './ErrorHandler';
import { Link } from 'react-router-dom';

function RegistrationForm() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [hasError, setError] = useState(false);
    const history = useHistory();

    // used to set state when the input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }

    }

    //used to make api call when the Register button is clicked
    const handleSubmit = () => {
        console.log(firstName, lastName, email, password, confirmPassword);
        const userInfo = {
            firstName, lastName, email, password, confirmPassword
        }
        try {
            axios// check if the email already exists, if not then save it in the db.json
                .get(`http://localhost:5000/userInfo?email=${email}`)
                .then((resp) => {
                    console.log(resp.data);
                    if (resp.data.length > 0) {
                        alert("User with this email already exists");
                    } else {
                        axios.post(`http://localhost:5000/userInfo/`, userInfo)
                            .then((resp) => {
                                history.push("/login");
                                console.log("resp", resp.data);
                            })
                    }
                })
                .catch((error) => console.log(error));
        }
        catch (error) {
            console.log('error in handleSubmit while registration', error);
            setError(error);
        }

    }

    return (
        <div>
            {!hasError && (
                <div className='form'>
                    <div className="form-body">
                        <div className="username">
                            <label className="form__label" for="firstName">First Name </label>
                            <input className="form__input" type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
                        </div>
                        <div className="lastname">
                            <label className="form__label" for="lastName">Last Name </label>
                            <input type="text" name="" id="lastName" value={lastName} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
                        </div>
                        <div className="email">
                            <label className="form__label" for="email">Email </label>
                            <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
                        </div>
                        <div className="password">
                            <label className="form__label" for="password">Password </label>
                            <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
                        </div>
                    </div>
                    <div className="footer">
                        <button onClick={() => handleSubmit()} type="submit" className="btn">Register</button>
                        <Link to={'/login'}><button>Login?</button></Link>
                    </div>
                </div>
            )}
            {hasError && <ErrorHandler error={hasError}></ErrorHandler>}
        </div>
    )

}

export default RegistrationForm