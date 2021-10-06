const cloudinary = require("cloudinary");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const createProduct = catchAsyncErrors( async (request, response, next) => {

})


const getAllProducts = catchAsyncErrors( async (request, response, next) => {
    
})

const getAdminProducts = catchAsyncErrors( async (request, response, next) => {
    
})

const getProductDetails = catchAsyncErrors( async (request, response, next) => {
    
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