import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import {CartItemCard} from '../'
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import './style.css'

const data = [1,1,1,1,1,1];

function Cart({history}) {
    return (
        <Fragment>
            {
                data.length === 0 ? (
                    <div className="emptyCart">
                        <RemoveShoppingCartIcon />
                        <Typography>No product in Your Cart</Typography>
                        <Link to="/products">View Products</Link>
                    </div>
                ) : (
                    <Fragment>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>

                            {
                                data && 
                                data.map((item) => (
                                    <div className="cart_main" >
                                        <CartItemCard />
                                        <div className="cartInput">
                                            <button>-</button>
                                            <input type="number" readOnly />
                                            <button >+</button>
                                        </div>
                                        <p className="cartSubtotal">{`₹135255`}</p>
                                    </div>
                                ))
                            }

                            <div className="cartGrossProfit">
                                <div></div>
                                <div className="cartGrossProfit_box">
                                    <p>Gross Total</p>
                                    <p>{`₹353453`}</p>
                                </div>
                                <div></div>
                                <div className="checkOut_btn">
                                    <button>Check Out</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    );
};

export default Cart
