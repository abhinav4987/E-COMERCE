import React from 'react'
import {Link} from "react-router-dom"
import { Rating } from "@material-ui/lab";
import numeral from 'numeral'
// import product from '../../images/product.jpg';
import './style.css';



function index({product}) {
    // console.log("product card : " , product);
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    
    return (
        <Link className="productCard" to={`/product/${product._id}`} >
            <img src={product.images[0].url} alt={product.name}/>
            <p>{product.name}</p>
            <div>
                <Rating {...options} />
                <span className="productCardSpan">
                    {" "}
                    ({product.numOfReviews})
                </span>
            </div>
            <span>{`₹${numeral(product.price).format('0,0.0')}`}</span>
        </Link>
    )
}

export default index
