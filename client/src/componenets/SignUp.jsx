import { useState } from 'react'
import logo from "../img/logoinsta2.png"
import "./SignUp.css"
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';


export default function SignUp() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // Toast Functions
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const postData = () => {
        
        //checking email
        if(!emailRegex.test(email)){
            notifyA("Invalid Email");
            return
        }else if(!passRegex.test(password)){
            notifyA("Password must contain at least 8 characters including at leat 1 number, 1 both lowercase and uppercase alphabet and special characters for example #, ?, !")
            // notifyA(`The string must contain at least 1 lowercase alphabetical character`)
            return
        }

  


        // Sending data to server
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                userName: userName,
                email: email,
                password: password 
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    // notifyA(data.error);
                    notifyA(data.warnkaro);
                }else{
                    notifyB(data.message);
                    navigate("/signin"); 
                }
                console.log((data))
            })
    }


    return (
        <div className='signUp'>
            <div className="form-container">
                <div className="form">
                    <img className='signUpLogo' src={logo} alt="logo" />
                    <p className='signUpPara'>
                        Sign up to see photos nand videos <br /> from your friends.
                    </p>
                    <div>
                        <input type="email" name="email" id="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" name="name" id="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" name="username" id="username" placeholder='Username' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <p className='signUpPara' style={{ fontSize: "0.9rem", margin: "3px 0px" }}>
                        By signing up, you agree to our Terms, <br /> privacy policy and cookies policy.
                    </p>
                    <input type="submit" id='submit-btn' value="Sign Up" onClick={() => { postData() }} />
                </div>

                <div className="form2">
                    Already have an account ?
                    <Link to="/signin" id='lineline'>
                        <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
                    </Link>

                </div>
            </div>

        </div>
    )
}