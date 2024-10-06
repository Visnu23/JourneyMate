import React, { useState } from 'react';
import "./register.css";
import { faEnvelope, faLock, faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Form() {
    const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm();
    const [action, setAction] = useState("Login");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            if (action === "Sign Up") {
                // Handle registration
                console.log('Registration request body:', data);
                const response = await axios.post('http://localhost:5000/api/users/add', data);
                console.log('Registration response:', response.data);
                alert('Registered successfully');
                navigate('/');
            } else {
                // Handle login
                const loginData = {
                    email: data.email,
                    password: data.password,
                };
                console.log('Login request body:', loginData);
                const response = await axios.post('http://localhost:5000/api/users/login', loginData);
                console.log('Login response:', response.data);
                alert('Logged in successfully');
                navigate('/book');
                localStorage.setItem('token', response.data.token); // Store token in localStorage
            }
            reset(); // Reset form fields
        } catch (error) {
            console.error(`${action} error:`, error);

            if (error.response) {
                console.error('Response error data:', error.response.data);
                if (error.response.status === 400 || error.response.status === 401) {
                    alert(`${action} failed: ${error.response.data.message || 'Invalid credentials'}`);
                } else if (error.response.status === 404) {
                    alert(`${action} failed: Not Found`);
                } else if (error.response.status === 500) {
                    alert(`${action} failed: Server Error`);
                } else {
                    alert(`${action} failed: ${error.response.data.message || 'An unknown error occurred'}`);
                }
            } else if (error.request) {
                console.error('Request error:', error.request);
                alert(`${action} failed: Network error or no response from server`);
            } else {
                console.error('Error message:', error.message);
                alert(`${action} failed: An unexpected error occurred`);
            }
        }
    };

    return (
        <div style={{ backgroundColor: 'blueviolet' }} className="container">
            <div className="heade">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <div className="input-group">
                            <FontAwesomeIcon className="picon" icon={faUser} />
                            <input
                                type="text"
                                id="username"
                                placeholder='Name'
                                {...register("username", {
                                    required: "Name is required",
                                    minLength: { value: 5, message: "Name must be at least 5 characters" },
                                    pattern: { value: /^[a-zA-Z_]+$/, message: "Only letters are allowed" },
                                })}
                            />
                        </div>
                        {errors.username && <small className="error-message">{errors.username.message}</small>}
                    </div>
                )}

                <div className="input">
                    <div className="input-group">
                        <FontAwesomeIcon className="picon" icon={faEnvelope} />
                        <input
                            type="email"
                            id="email"
                            placeholder='Email Id'
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
                                minLength: { value: 8, message: "Email must be at least 8 characters" },
                            })}
                        />
                    </div>
                    {errors.email && <small className="error-message">{errors.email.message}</small>}
                </div>

                <div className="input">
                    <div className="input-group">
                        <FontAwesomeIcon className="picon" icon={faLock} />
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                pattern: { value: /^[0-9]+$/, message: "Password must contain only numbers" },
                            })}
                        />
                    </div>
                    {errors.password && <small className="error-message">{errors.password.message}</small>}
                </div>

                {action === "Sign Up" && (
                    <div className="input">
                        <div className="input-group">
                            <FontAwesomeIcon className="picon" icon={faCheck} />
                            <input
                                type="password"
                                id="confirm"
                                placeholder='Re-Password'
                                {...register("confirm", {
                                    required: "Please confirm your password",
                                    validate: value => value === getValues("password") || "Passwords do not match",
                                })}
                            />
                        </div>
                        {errors.confirm && <small className="error-message">{errors.confirm.message}</small>}
                    </div>
                )}

                <button type="submit" className='sit'>Submit</button>
            </form>
            <div className="submitcontainer">
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={() => { setAction("Sign Up"); reset(); }}
                >
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => { setAction("Login"); reset(); }}
                >
                    Login
                </div>
            </div>
        </div>
    );
}







// import React, { useState } from 'react';
// import "./register.css" ;
// import { faEnvelope, faLock, faUser, faCheck } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useForm } from "react-hook-form";
// import axios from 'axios';

// export default function Form() {
//     const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm();
//     const [action, setAction] = useState("Login");

//     const onSubmit = async (data) => {
//         console.log('Request body:', data);
//         try {
//             // Send the POST request to the server
//             const response = await axios.post('http://localhost:5000/api/users/add', data);
//             console.log('Response:', response.data);
//             alert('Registered successfully');
//             reset(); // Reset form fields
//         } catch (error) {
//             // Log the error for debugging
//             console.error('Registration error:', error);

//             // Check if the error is a response from the server
//             if (error.response) {
//                 console.error('Response error data:', error.response.data);
//                 console.error('Response status:', error.response.status);
//                 console.error('Response headers:', error.response.headers);

//                 // Handle different status codes
//                 if (error.response.status === 400) {
//                     alert(`Registration failed: ${error.response.data.message || 'Bad Request'}`);
//                 } else if (error.response.status === 401) {
//                     alert('Registration failed: Unauthorized');
//                 } else if (error.response.status === 404) {
//                     alert('Registration failed: Not Found');
//                 } else if (error.response.status === 500) {
//                     alert('Registration failed: Server Error');
//                 } else {
//                     alert(`Registration failed: ${error.response.data.message || 'An unknown error occurred'}`);
//                 }
//             } else if (error.request) {
//                 // Handle network errors or request issues
//                 console.error('Request error:', error.request);
//                 alert('Registration failed: Network error or no response from server');
//             } else {
//                 // Handle other errors
//                 console.error('Error message:', error.message);
//                 alert('Registration failed: An unexpected error occurred');
//             }
//         }
//     };

//     return (
//         <div style={{ backgroundColor: 'blueviolet' }} className="container">
//             <div className="heade">
//                 <div className="text">{action}</div>
//                 <div className="underline"></div>
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)} className="inputs">
//                 {action !== "Login" && (
//                     <div className="input">
//                         <div className="input-group">
//                             <FontAwesomeIcon className="picon" icon={faUser} />
//                             <input
//                                 type="text"
//                                 id="username"
//                                 placeholder='Name'
//                                 {...register("username", {
//                                     required: "Name is required",
//                                     minLength: { value: 5, message: "Name must be at least 5 characters" },
//                                     pattern: { value: /^[a-zA-Z_]+$/, message: "Only letters are allowed" },
//                                 })}
//                             />
//                         </div>
//                         {errors.username && <small className="error-message">{errors.username.message}</small>}
//                     </div>
//                 )}

//                 <div className="input">
//                     <div className="input-group">
//                         <FontAwesomeIcon className="picon" icon={faEnvelope} />
//                         <input
//                             type="email"
//                             id="email"
//                             placeholder='Email Id'
//                             {...register("email", {
//                                 required: "Email is required",
//                                 pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
//                                 minLength: { value: 8, message: "Email must be at least 8 characters" },
//                             })}
//                         />
//                     </div>
//                     {errors.email && <small className="error-message">{errors.email.message}</small>}
//                 </div>

//                 <div className="input">
//                     <div className="input-group">
//                         <FontAwesomeIcon className="picon" icon={faLock} />
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder='Password'
//                             {...register("password", {
//                                 required: "Password is required",
//                                 minLength: { value: 6, message: "Password must be at least 6 characters" },
//                                 pattern: { value: /^[0-9]+$/, message: "Password must contain only numbers" },
//                             })}
//                         />
//                     </div>
//                     {errors.password && <small className="error-message">{errors.password.message}</small>}
//                 </div>

//                 {action !== "Login" && (
//                     <div className="input">
//                         <div className="input-group">
//                             <FontAwesomeIcon className="picon" icon={faCheck} />
//                             <input
//                                 type="password"
//                                 id="confirm"
//                                 placeholder='Re-Password'
//                                 {...register("confirm", {
//                                     required: "Please confirm your password",
//                                     validate: value => value === getValues("password") || "Passwords do not match",
//                                 })}
//                             />
//                         </div>
//                         {errors.confirm && <small className="error-message">{errors.confirm.message}</small>}
//                     </div>
//                 )}

//                 <button type="submit" className='sit'>Submit</button>
//             </form>
//             {action !== "Sign Up" && (
//                 <div className="forgotpass">Lost Password? <span>Click Here!</span></div>
//             )}
//             <div className="submitcontainer">
//                 <div
//                     className={action === "Login" ? "submit gray" : "submit"}
//                     onClick={() => { setAction("Sign Up"); reset(); }}
//                 >
//                     Sign Up
//                 </div>
//                 <div
//                     className={action === "Sign Up" ? "submit gray" : "submit"}
//                     onClick={() => { setAction("Login"); reset(); }}
//                 >
//                     Login
//                 </div>
//             </div>
//         </div>
//     );
// }
