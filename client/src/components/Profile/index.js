import React,{Fragment, useEffect} from 'react';
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import profile from '../../images/profile.png';
import {Loader} from '../'

import './style.css';


function Profile({history}) {

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    
    useEffect(() => {
        if (isAuthenticated === false && loading === false) {
            history.push("/login");
        }
    }, [history, isAuthenticated,loading,user]);

    return (

        <Fragment>
            { loading || !isAuthenticated  ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="profile_container">
                        <div>
                            <h1>My Profile</h1>
                            <><img  src={user.avatar.url} alt='#'/></>
                            <Link to="/me/update">Edit My Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/">My Order</Link>
                                <Link to="/">Change Password</Link>
                            </div>
                        </div>            
                    </div>
                </Fragment>
            )}
            
        </Fragment>
    )
}

export default Profile
