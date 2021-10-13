const cloudinary = require("cloudinary");
const Product = require("../models/product.model");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



const createProduct = catchAsyncErrors( async (request, response, next) => {
    let images = [];

    if (typeof request.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = request.body.images;
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
    
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    request.body.images = imagesLinks;
    request.body.user = request.user.id;

    const product = await Product.create(request.body);

    response.status(201).json({
        success: true,
        product,
    }); 
});




const getAllProducts = catchAsyncErrors( async (request, response, next) => {
    
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    console.log(request.query);
    const apiFeature = new ApiFeatures(Product.find(), request.query)
                            .search()
                            .filter();
    // let products = await apiFeature.query;
    // let filteredProductsCount = products.length;


    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    response.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        // filteredProductsCount,
    });
})

const getAdminProducts = catchAsyncErrors( async (request, response, next) => {

    const products = await Product.find();

    response.status(200).json({
        success: true,
        products,
    });
})

const getProductDetails = catchAsyncErrors( async (request, response, next) => {
    const product = await Product.findById(request.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    response.status(200).json({
        success: true,
        product,
    });
})

const updateProduct = catchAsyncErrors( async (request, response, next) => {
    
})

const deleteProduct = catchAsyncErrors( async (request, response, next) => {
    
})

const createProductReview = catchAsyncErrors( async (request, response, next) => {
    
})

const getPorductReviews = catchAsyncErrors( async (request, response, next) => {
    
})

const deleteReview = catchAsyncErrors( async (request, response, next) => {
    
})

module.exports = {
    createProduct,
    getAllProducts,
    getAdminProducts,
    getProductDetails,
    updateProduct,
    deleteProduct,
    createProductReview,
    getPorductReviews,
    deleteReview,
}