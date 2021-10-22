import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    userReducer,
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
} from "./reducers/user.reducer";


import { 
    productsReducer,
    productReducer, 
    newProductReducer, 
    productDetailsReducer,
    productReviewsReducer,
    newReviewReducer,
    reviewReducer,
} from "./reducers/product.reducer";

import { 
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from "./reducers/order.reducer";

import { cartReducer} from './reducers/cart.reducer';
const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,


    productDetails : productDetailsReducer,
    products: productsReducer,
    product: productReducer,
    newProduct: newProductReducer,

    cart: cartReducer,
    
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,

    newReview: newReviewReducer,
    review: reviewReducer,
    productReviews: productReviewsReducer,

});

const middleware = [thunk];

let initialState = {
    cart: {
        cartItems: window.sessionStorage.getItem("cartItems")
            ? JSON.parse(window.sessionStorage.getItem("cartItems"))
            : [],
        shippingInfo: window.sessionStorage.getItem("shippingInfo")
            ? JSON.parse(window.sessionStorage.getItem("shippingInfo"))
            : {},
    },
    user: {
        loading: false,
        user: window.sessionStorage.getItem("user") 
                ?JSON.parse(window.sessionStorage.getItem("user"))
                : {},
        isAuthenticated: window.sessionStorage.getItem("user")
                ? true
                : false,
    }
};


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;