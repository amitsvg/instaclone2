import React from "react";
import { RiCloseLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import './Modal.css'


export default function Modal({setModalOpen,setUserLogin} ) {
    const navigate = useNavigate();
    return (
        <div className="darkBg" onClick={()=>setModalOpen(false)} >
            {/* <div className="darkBg" > */}
            <div className="centered" >
            <div className="modal">
                {/* modal header */}
                <div className="modalHeader">
                    <h5 className="heading">Confirm</h5>
                </div>
                <button className="closeBtn">
                    <RiCloseLine onClick={()=>setModalOpen(false)}></RiCloseLine>
                </button>
                {/* modal content */}
                <div className="modalContent">
                    Do you really want to Log Out ?
                </div>
                <div className="modalActions">
                    <div className="actionsContainer">
                        <button className="logOutBtn" onClick={()=>{
                            setModalOpen(false);
                            localStorage.clear();
                            navigate("/signin")
                            setUserLogin(false);

                        }}
                        
                        >Log Out</button>
                        <button className="cancelBtn">cancel</button>
                    </div>
                </div>
            </div>
        </div>

        </div>
        



    )
}