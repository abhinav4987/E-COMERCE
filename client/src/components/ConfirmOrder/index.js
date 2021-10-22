import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {CheckOutSteps} from "../";
import profile from '../../images/profile.png'
import './style.css'


const data = [1,1,1,1,1,1,1];

function ConfirmOrder({ history }) {
    
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    console.log("confirm order : ", user);
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;


    const proceedToPayment = () => {
            const data = {
                subtotal,
                shippingCharges,
                tax,
                totalPrice,
            };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        history.push("/process/payment");
    };
    
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
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItems_box">
                            {cartItems && 
                                cartItems.map((item,idx) => (
                                    <div key={idx}>
                                        <img src={item.image}/>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                        {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{(item.price * item.quantity).toFixed(2)}</b>
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
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges.toFixed(2)}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>

                    
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder
