import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className="container h-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-4">
                    <h1 className="text-center mb-4">Sign Up</h1>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email address"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                className="form-control"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                        </div>

                        <div className="mb-3">
                            <button
                                className="btn btn-primary w-100"
                                type="submit"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="text-sm text-center">
                        Already have an account?{' '}
                        <NavLink to="/login">
                            Sign in
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup;
