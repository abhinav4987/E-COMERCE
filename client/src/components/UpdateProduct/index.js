import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import  Sidebar from "../Dashboard/SideBar";
import {UPDATE_PRODUCT_RESET} from '../../redux/actionTypes'
import {getProductDetails, updateProduct} from '../../redux/actions/product.action';
import './style.css'

function UpdateProduct({match, history}) {
    
    const dispatch = useDispatch();
    // const alert = useAlert();
    console.log("match : ",match);
    const { error, product } = useSelector((state) => state.productDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const categories = [
        "Laptop",   
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];
    

    const productId = match.params.id;
    useEffect(() => {
        if(product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            console.log("our product :: ",product);
            if(product && typeof product !== 'undefined'){
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);}
        }
        if(error) {
            // dispatch(clearErrors());
        }

        if(updateError) {
            // dispatch(clearErrors());
        }

        if(isUpdated) {
            history.push("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [
        dispatch,
        error,
        history,
        isUpdated,
        productId,
        product,
        updateError
    ]);

    const updateProductSubmitHandler = (e) => {

        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);


        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(updateProduct(productId,myForm));
    }



    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
        files.forEach((file) => {
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, file]);
                }
            };
    
            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            
            <div className="dashboard">
                <Sidebar />
                <div className="newProduct_main">
                    <form 
                        className="newProduct_form"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                            type="text"
                            placeholder="Product Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                <option key={cate} value={cate}>
                                    {cate}
                                </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={Stock}
                            />
                        </div>
                        
                        <div id="createProduct_form_file">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProduct_form_image">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
                        </div>

                        <div id="createProduct_form_image">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProduct_btn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>                
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct
