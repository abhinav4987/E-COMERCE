import React, { Fragment, useState, useEffect } from "react";
import {Loader} from '../';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import './style.css';


function ForgotPassword() {
    
    const [email, setEmail] = useState("");

    
    return (
        <Fragment>
            {
                true ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <div className="forgotPasswsord_main">
                            <div className="forgotPassword_box">
                                <h2 className="forgotPassword_heading">
                                    Forgot Password
                                </h2>

                                <form
                                    className="forgotPassword_form"
                                >
                                    <div className="forgotPassword_email">
                                        <MailOutlineIcon />
                                        <input 
                                            type="email"
                                            placceholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <input 
                                        type="submit"
                                        value="Send"
                                        className="forgotPassword_btn"
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

export default ForgotPassword
