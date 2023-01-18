import React from 'react'
import "./Navbar.css"
import logo from "../img/logoinsta2.png"
// import logo from "../img/logoinsta2.svg"
import { Link } from 'react-router-dom'

import { LoginContext } from '../context/LoginContext';
import { useContext } from 'react'


export default function Navbar({ login }) {
    const { setModalOpen } = useContext(LoginContext)
    // const loginVar = false;
    
    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (token || login) {
            // loginVar = true;
            return true;
        }
        else {
            // loginVar = false;
            return false;
        }
    }
    // useEffect(()=>{
    //     loginStatus();
    // },[login])


    return (
        <div className='navbar'>
            {/* <img src={logo} alt="logo" /> */}
            <div className="nav-img">
                <Link to="/" className='linkHome' >
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <ul className='nav-menu'>
                {loginStatus() && <Link to="/createPost">
                    {/* {loginVar && <Link to="/createPost"> */}
                    <li>
                        <span className="material-symbols-sharp">
                            add_box
                        </span>
                    </li>
                </Link>
                }
                {!loginStatus() && <Link to="/signup"><li>SignUp</li></Link>}
                {/* {!loginVar && <Link to="/signup"><li>SignUp</li></Link>} */}
                {!loginStatus() && <Link to="/signin"><li>SignIn</li></Link>}
                {/* {!loginVar && <Link to="/signin"><li>SignIn</li></Link>} */}
                {loginStatus() && <Link to="/profile"><li>Profile</li></Link>}
                {/* {loginVar && <Link to="/profile"><li>Profile</li></Link>} */}
                {loginStatus() &&
                        <button
                            className='primaryBtn'
                            onClick={() => setModalOpen(true)}
                        >
                            Log
                            <span id='spaceSpan'>
                                Out
                            </span>
                        </button>
                    // </Link>
                }
            </ul>

        </div>
    )
}