import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../actionTypes";

let initialState = {
    cartItems : [],
    shippingInfo: {}
};

export const cartReducer = (
    state = initialState,
    action
) => {
    switch(action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                
                console.log("exists");
                
                return {
                ...state,
                cartItems: state.cartItems.map((i) =>
                    i.product === isItemExist.product ? {...item, quantity: item.quantity + 1} : i
                ),
                };
            } else {
                return {
                ...state,
                cartItems: [...state.cartItems, item],
                };
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };
        default:
            return state;
    }
}