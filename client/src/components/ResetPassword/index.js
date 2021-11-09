import React, { Fragment, useState, useEffect } from "react";
import {Loader} from '../';
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import{resetPassword} from '../../redux/actions/user.action'

function ResetPassword({match}) {
    const dispatch = useDispatch();
    
    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(match.params.token, myForm));
    };

    // useEffect(() => {

    // }, [dispatch, error, alert, history, success]);

    return (
        <Fragment >
            {
                true ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <div className="resetPassword_main">
                            <div classNaame="ressetPassword_box">
                                <h2 className="resetPassword_heading">Update Profile</h2>

                                <form>
                                    <div>
                                        <LockOpenIcon />
                                        <input 
                                            type="Password"
                                            placeholder="New Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockIcon />
                                        <input 
                                            type="passsword"
                                            placeholder="Confirm Password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Update"
                                        className="resetPasswordBtn"
                                    />
                                </form>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default ResetPassword
