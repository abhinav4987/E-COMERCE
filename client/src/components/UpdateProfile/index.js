import React, { Fragment, useState, useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import profile from '../../images/profile.png';
import './style.css';

function UpdateProfile({history}) {
    
    const dispatch = useDispatch(); 

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(profile);



    return (
        <Fragment>
            <div className="updateProfile_container">
                <div className="updateProfile_box">
                    <h2 className="updateProfile_heading">
                        Update Profile
                    </h2>

                    <form
                        className="updateProfile_form"
                        encType="multipart/form-data"
                    >
                        <div className="updateProfile_name">
                            <FaceIcon />
                            <input 
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                            />
                        </div>
                        <div className="updateProfile_email">
                            <MailOutlineIcon />
                            <input 
                                type="email"
                                placeholder="Name"
                                required
                                name="email"
                                value={email}
                            />
                        </div>
                        <div id="updateProfile_image">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input 
                                type="file"
                                placeholder="Name"
                                // required
                                accept="image/"
                                name="avatar"
                                value={email}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Update"
                            className="updateProfile_button"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile
