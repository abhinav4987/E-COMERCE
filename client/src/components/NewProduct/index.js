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
import Sidebar from '../Dashboard/SideBar';
import './style.css'

function NewProduct() {
    

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


    return (
        <Fragment>
            <div className="dashboard">
                <Sidebar />
                <div className="newProduct_main">
                    <form
                        className="newProduct_form"
                        encType="multipart/form-data"
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
                                // onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProduct_form_image">
                            
                        </div>

                        <Button 
                            id="createProduct_btn"
                            type="submit"
                            
                        ></Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct
