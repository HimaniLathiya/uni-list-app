import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import loginImage from "../../images/login.png";
import { toastrService } from '../../services/toastr.service';

const propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPasssword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateForm(errors)) {
                // call API
            } else {
                toastrService.error("Invalid Form, Please enter proper values")
                setLoginLoading(false);
            }
        } catch (err) {
            toastrService.error("Something went wrong!")
            setLoginLoading(false);
        }
    };
    const validateForm = (formErrors) => {
        let valid = true;
        if (!email) {
            valid = false
            errors.email = "Please enter email"
        }
        if (!password) {
            valid = false
            errors.password = "Please enter password"
        }
        setErrors({
            ...errors,
            errors
        });
        Object.values(formErrors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        const validEmailRegex = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
        switch (name) {
            case 'email':
                errors.email = value && validEmailRegex.test(value)
                    ? ''
                    : 'Email is not valid!';
                setEmail(value)
                break;
            case 'password':
                errors.password = value.length < 6
                    ? 'Password must be 6 characters long!'
                    : '';
                setPasssword(value)
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            errors
        });
    }

    return (
        <>
            <div className="wrap-login100 wrap-content">
                {loginLoading && <div className={'logonFormLoader'}>&nbsp;</div>}
                <div className="login100-pic js-tilt" data-tilt>
                    <img src={loginImage} alt="IMG" />
                </div>
                <form onSubmit={handleOnSubmit} noValidate
                    id="login-form"
                    className="login100-form validate-form"
                >
                    {/* {loginError && <div className={'text-danger'}>{loginError}</div>} */}
                    <div
                        className="wrap-input100 validate-input">
                        <input
                            className="input100"
                            value={email}
                            onChange={handleChange}
                            autoComplete="off"
                            id="email-input"
                            name="email"
                            type="text"
                            placeholder="email"
                        />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className='text-danger'>{errors.email.length > 0 && <span className='error'>{errors.email}</span>}</div>
                    <div className="wrap-input100 validate-input">
                        <input
                            className="input100"
                            autoComplete="off"
                            id="password-input"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="password"
                        />

                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className='text-danger'>{errors.password.length > 0 && <span className='error'>{errors.password}</span>}</div>
                    <div className="container-login100-form-btn">
                        <button className="login100-form-btn">Login</button>
                    </div>

                    <div className="text-center p-t-50">
                        <Link className="txt2" to="/register">
                            Create your Account
                            <i
                                className="fa fa-long-arrow-right m-l-5"
                                aria-hidden="true"
                            ></i>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

Login.propTypes = propTypes;
export default Login;
