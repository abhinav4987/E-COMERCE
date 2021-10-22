import React, { Fragment, useState, useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser} from '../../redux/actions/user.action'
import { useAlert } from "react-alert";
import profile from '../../images/profile.png';
import { UPDATE_PROFILE_RESET } from "../../redux/actionTypes";
import {Loader} from '../'
import './style.css';

function UpdateProfile({history}) {
    
    const dispatch = useDispatch(); 
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(profile);

    const updateProfileSubmit = (e) => {

        e.preventDefault();

        const newForm = new FormData();

        newForm.set("name",name);
        newForm.set("email",email);
        newForm.set("avatar",avatar);
        dispatch(updateProfile(newForm));

    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
    
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };
    
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
    
    
        if (isUpdated) {
            // alert.success("Profile Updated Successfully");
            dispatch(loadUser());
        
            history.push("/account");
        
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, alert, history, user, isUpdated]);

    console.log("user : ", user);
    return (
        <Fragment>
        {!user ? (
            <Loader />
        ): (
            <Fragment>
                <div className="updateProfile_container">
                    <div className="updateProfile_box">
                        <h2 className="updateProfile_heading">
                            Update Profile
                        </h2>

                        <form
                            className="updateProfile_form"
                            encType="multipart/form-data"
                            onSubmit={updateProfileSubmit}
                        >
                            <div className="updateProfile_name">
                                <FaceIcon />
                                <input 
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="updateProfile_email">
                                <MailOutlineIcon />
                                <input 
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    // value={avatar}
                                    onChange={updateProfileDataChange}
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
        ) }
        </Fragment>
    )
}

export default UpdateProfile
