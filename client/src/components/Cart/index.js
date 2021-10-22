import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import {CartItemCard} from '../'
import {addItemsToCart, removeItemsFromCart} from '../../redux/actions/cart.action';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import './style.css'

const data = [1,1,1,1,1,1];

function Cart({history}) {
    
    const dispatch = useDispatch({});

    const {cartItems, shippingInfo} =  useSelector((state) => state.cart);
    
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };
    console.log("cart ka saman : ",cartItems);
    return (
        <Fragment>
            {
                cartItems.length === 0 ? (
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
                                cartItems && 
                                cartItems.map((item) => (
                                    <div className="cart_main" >
                                        <CartItemCard item={item}  />
                                        <div className="cartInput">
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item.product, item.quantity)
                                                }
                                            >-</button>
                                            <input  readOnly value={item.quantity} />
                                            <button 
                                                onClick={() =>
                                                    increaseQuantity(
                                                    item.product,
                                                    item.quantity,
                                                    item.stock
                                                    )
                                                }
                                            >+</button>
                                        </div>
                                        <p className="cartSubtotal">{`₹${
                                            item.price * item.quantity
                                        }`}</p>
                                    </div>
                                ))
                            }

                            <div className="cartGrossProfit">
                                <div></div>
                                <div className="cartGrossProfit_box">
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.quantity * item.price,
                                        0
                                    )}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOut_btn">
                                    <button onClick={checkoutHandler}>Check Out</button>
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
