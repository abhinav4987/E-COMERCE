import React from 'react'
import {Link} from "react-router-dom"
import { Rating } from "@material-ui/lab";
import product from '../../images/product.jpg';
import './style.css';


function index() {
    return (
        <Link className="productCard" to="/" >
            <img src={product}/>
            <p>Product</p>
            <div>
                <Rating />
                <span className="productCardSpan">
                    {" "}
                    12 Reviews
                </span>
            </div>
            <span>₹2,345</span>
        </Link>
    )
}

export default index
