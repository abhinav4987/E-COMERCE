import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from  "../actionTypes"
import axios from "axios";

const baseUrl = "http://localhost:5001"


export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(baseUrl + `/api/v1/product/${id}`);
    if(quantity > 0){
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity,
            }
        });

        window.sessionStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });
    
    window.sessionStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    window.sessionStorage.setItem("shippingInfo", JSON.stringify(data));
}
