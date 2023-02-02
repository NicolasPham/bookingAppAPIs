import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext.js'
import { Link, useNavigate } from 'react-router-dom';
import "./login.scss";

const Login = () => {

    const [credential, setCredential] = useState({
        username: undefined,
        password: undefined,
    })

    const handleChange = (e) => {
        setCredential(prev => (
            { ...prev, [e.target.id]: e.target.value }
        ))
    }

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credential)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate('/');
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.response.data })
        }
    }


    return (
        <main>
            <div className="login">
                <h2>Welcome to</h2>
                <h1>Nicolas Booking</h1>
                <form>
                    <input type="text" placeholder="username" id="username" onChange={handleChange} />
                    <input type="password" placeholder="password" name="password" id="password" onChange={handleChange} />
                    <button onClick={handleLogin}>Login</button>
                </form>
                <p>Don't have account? <Link to="/register" className="link"><button>Register</button></Link></p>
                <div className="account">
                    <p>username / password: admin</p>
                </div>

            </div>
        </main>
    )
}

export default Login;