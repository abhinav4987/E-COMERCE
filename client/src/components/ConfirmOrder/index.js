import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {CheckOutSteps} from "../";
import profile from '../../images/profile.png'
import './style.css'

const data = [1,1,1,1,1,1,1];

function ConfirmOrder() {
    return (
        <Fragment>
            <CheckOutSteps activeStep={1}/> 
            <div className="confirmOrder">
                <div>
                    <div className="confirmShipping_main">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmShipping_box">
                            <div>
                                <p>Name:</p>
                                <span>Abhinav</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>8967536212</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>170,DDA SFS FLATS, sector-9, New Delhi</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItems_box">
                            {data && 
                                data.map((item,idx) => (
                                    <div key={idx}>
                                        <img src={profile}/>
                                        <Link to={`/product/fdf23fq`}>
                                            Product Name
                                        </Link>
                                        <span>
                                            quantity * price = {" "}
                                            <b>₹385252</b>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div> 
                
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summery</Typography>
                        <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>₹1234</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>₹123</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>₹12.3</span>
                        </div>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>₹1370.3</span>
                    </div>

                    <button >Proceed To Payment</button>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder
