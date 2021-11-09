import React from 'react'
import { Link } from "react-router-dom";
import product from '../../images/product.jpg'
import './style.css'

function CartItemCard({ item, deleteCartItems }) {
    return (
        <div className="CartItemCard">
            <img src={item.image} alt="sa" />
            <div>
                <Link to={`/product/hjve`}/>
                <span>{`Price : ₹37832`}</span>
                <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    )
}



export default CartItemCard
