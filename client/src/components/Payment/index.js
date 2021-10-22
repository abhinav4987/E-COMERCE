import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import { useAlert } from "react-alert";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {createOrder} from '../../redux/actions/order.action';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import './style.css';
// import { createOrder, clearErrors } from "../../redux/actions/order.action";
import CheckOutSteps from "../CheckOutSteps";

const baseUrl = "http://localhost:5001";

function Payment({history}) {
    
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    
    const dispatch = useDispatch();
    // const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {

            const config = {
                headers: { 
                    "Content-Type": "application/json"
                    ,"crossDomain": true
                },
                "withCredentials": true,
            };

            const { data } = await axios.post(baseUrl +
                "/api/v1/payment/process",
                paymentData,
                config
            );
            // console.log("payment data : ", data);
            const client_secret = data.client_secret;
                
            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                  card: elements.getElement(CardNumberElement),
                  billing_details: {
                    name: user.name,
                    email: user.email,
                    address: {
                        line1: shippingInfo.address,
                        city: shippingInfo.city,
                        state: shippingInfo.state,
                        postal_code: shippingInfo.pinCode,
                        country: shippingInfo.country,
                    },
                },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
        
                // alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
        
                    dispatch(createOrder(order));
        
                    history.push("/success");
                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }
            } catch (error) {
                payBtn.current.disabled = false;
                // alert.error(error.response.data.message);
            }
        };
    

    

    return (
        <Fragment>
            <CheckOutSteps activeStep={2} />
            <div className="payment_main">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentForm_btn"
                    />
                </form>

            </div>
        </Fragment>
    )
}

export default Payment
