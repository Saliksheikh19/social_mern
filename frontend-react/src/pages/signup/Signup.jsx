import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"

export default function Signup() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate()

    async function signupHandler(e) {
        e.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Password doesn't match")
        } else {
            const user = {
                userName: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("http://localhost:8000/auth/signup", user);
                navigate('/')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className="loginTitle">SocialMedia</h1>
                    <p className="tagline">This is the tag line of SocialMedia</p>
                </div>
                <div className="loginRight">
                    <form className="loginBox signupBox" onSubmit={signupHandler}>
                        <div class="form__group field">
                            <input type="text" class="form__field" ref={username} placeholder="Username" required />
                            <label for="name" class="form__label">Username</label>
                        </div>
                        <div class="form__group field">
                            <input type="email" class="form__field" ref={email} placeholder="Email" required />
                            <label for="name" class="form__label">Email Address</label>
                        </div>
                        <div class="form__group field">
                            <input type="password" class="form__field" minLength={8} ref={password} placeholder="Password" required />
                            <label for="name" class="form__label">Password</label>
                        </div>
                        <div class="form__group field">
                            <input type="password" class="form__field" minLength={8} ref={confirmPassword} placeholder="Confirm password" required />
                            <label for="name" class="form__label">Confirm Password</label>
                        </div>
                        <button className="loginBtn seeMoreBtn" type="submit">Sign up</button>
                        <Link to={'/login'}>
                            <button className="signupBtn seeMoreBtn">Log in to your account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
