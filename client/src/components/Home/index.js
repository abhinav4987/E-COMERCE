import React, {Fragment, useEffect} from 'react'
import {CgMouse} from 'react-icons/all';
import ProductCard from '../ProductCard'
import {getProduct} from '../../redux/actions/product.action';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import './style.css'

const data = [0,0,0,0,0,0,0,0,0,0,0,0,];
function Home() {
    
    // const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);


    useEffect(() => {
        dispatch(getProduct());
    },[dispatch,error]);

    
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ): ( 
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
                        {products && 
                            data.map((info)=> (
                                <ProductCard />
                            ))
                        }
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}



export default Home 