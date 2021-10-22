import React, {useState, Fragment} from 'react'
import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { createProduct } from '../../redux/actions/product.action'

import Sidebar from '../Dashboard/SideBar';
import './style.css'

function NewProduct() {
    const dispatch = useDispatch();


    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones"
    ]

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(name," ",price," ",description," ",category," ",Stock);
        let newForm = new FormData();

        newForm.set("name",name);
        newForm.set("price",price);
        newForm.set("description",description);
        newForm.set("category",category);
        newForm.set("Stock",Stock);
        
        images.forEach((image) => {
            newForm.append("images", image);
        });
        console.log(newForm);
        dispatch(createProduct(newForm))
    }

    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        console.log(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                setImagesPreview((old) => [...old, reader.result]);
                setImages((old) => [...old, file]);
                }
            };

            reader.readAsDataURL(file);
            console.log(reader);
        });
        // setImages((old) => [...old, files]);
        console.log("new images : ",images);
    }

    return (
        <Fragment>
            <div className="dashboard">
                <Sidebar />
                <div className="newProduct_main">
                    <form
                        className="newProduct_form"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product </h1>
                        <div>
                            <SpellcheckIcon />
                            <input 
                                type="text"
                                placeholder="Product Name"
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
                            />
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div >
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id = "createProduct_form_file">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImageChange}
                                multiple
                            />
                        </div>

                        <div id="createProduct_form_image">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="preview" />
                            ))}
                        </div>

                        <Button 
                            id="createProduct_btn"
                            type="submit"
                            
                        > Create</Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct
