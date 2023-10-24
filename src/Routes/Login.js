import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    return (
        <div className="container h-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-4">
                    <h1 className="text-center mb-4">Vendia App: Login</h1>
                    <form>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                className="form-control"
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <button
                                className="btn btn-primary w-100"
                                onClick={onLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="text-sm text-center">
                        No account yet? {' '}
                        <NavLink to="/signup">
                            Sign up
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
