import React,{Fragment, useEffect} from 'react';
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import profile from '../../images/profile.png';

import './style.css';
function Profile() {
    return (
        <Fragment>
            <div className="profile_container">
                <div>
                    <h1>My Profile</h1>
                    <img  src={profile} alt='#'/>
                    <Link to="/me/update">Edit My Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>Name</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>Name</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>Name</p>
                    </div>

                    <div>
                        <p>Link1</p>
                        <p>Link2</p>
                    </div>
                </div>            
            </div>
        </Fragment>
    )
}

export default Profile
