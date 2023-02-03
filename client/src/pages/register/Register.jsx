import "./register.scss"
import { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext.js'
import { Link, useNavigate } from 'react-router-dom';
import { axiosIntance } from "../../config.js";

export const Register = () => {

    const [credential, setCredential] = useState({
        username: undefined,
        password: undefined,
        email: undefined,
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
        try {
            const res = await axiosIntance.post('/auth/register', credential)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            navigate('/')
        } catch (error) {
            dispatch({type: "LOGIN_FAIL", payload: error.response.data})
        }

    }
  return (
    <main>

            <div className="register">
                <h2>Welcome to</h2>
                <h1>Nicolas Booking</h1>
                <form>
                    <input type="text" placeholder="username" id="username" onChange={handleChange} />
                    <input type="email" placeholder="email" name="email" id="email" onChange={handleChange} />
                    <input type="password" placeholder="password" name="password" id="password" onChange={handleChange} />
                    <button onClick={handleLogin}>Register</button>
                </form>
                <p>Already have account? <Link to="/login" className="link"><button>Login</button></Link></p>

            </div>
        </main>
  )
}
