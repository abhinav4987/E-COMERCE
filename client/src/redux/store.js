import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    userReducer
} from "./reducers/user.reducer";
import { productsReducer } from "./reducers/product.reducer";

const reducer = combineReducers({
    user: userReducer,
    products: productsReducer,
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;