import React, {Fragment} from 'react'
import {CgMouse} from 'react-icons/all';
import ProductCard from '../ProductCard'
import './style.css'

const data = [0,0,0,0,0,0,0,0,0,0,0,0,]
function Home() {
    return (
        <Fragment>
            <div className="home-banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>
            
            <h2 className="home-featured">Featured Products</h2>
            <div className="home-product-Container">
                {
                    data.map((info)=> (
                        <ProductCard />
                    ))
                }
            </div>
        </Fragment>
    )
}

export default Home 