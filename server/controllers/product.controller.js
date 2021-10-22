const cloudinary = require("cloudinary");
const Product = require("../models/product.model");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const fs = require('fs')



const createProduct = catchAsyncErrors( async (request, response, next) => {
    
    console.log("form : ",request);
    
    
    const imagesLinks = [];
    if(request.files.images) {

        if(Array.isArray(request.files.images))
        for (let i = 0; i < request.files.images.length; i++) {

            console.log("storing :: ",request.files.images[i]);
    
            const fileType = request.files.images[i].mimetype.replace("image/","");
            fs.writeFileSync(`./Image.${fileType}`, request.files.images[i].data)
            const result = await cloudinary.v2.uploader.upload(`Image.${fileType}`, {
                folder: "products",
            },
                function(error, result) {
                    if(error) {
                        console.log("cloud Error : ");
                        fs.writeFile('./Output.txt', JSON.stringify(error), (err) => { 
                            // In case of a error throw err. 
                            if (err) throw err; 
                        }) 
                    } else {
                        console.log("cloud result ", result);
                    }
                }
            );
        
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
            fs.unlinkSync(`./Image.${fileType}`);
        }
        else {
            const fileType = request.files.images.mimetype.replace("image/","");
            fs.writeFileSync(`./Image.${fileType}`, request.files.images.data)
            const result = await cloudinary.v2.uploader.upload(`Image.${fileType}`, {
                folder: "products",
            },
                function(error, result) {
                    if(error) {
                        console.log("cloud Error : ");
                        fs.writeFile('./Output.txt', JSON.stringify(error), (err) => { 
                            // In case of a error throw err. 
                            if (err) throw err; 
                        }) 
                    } else {
                        console.log("cloud result ", result);
                    }
                }
            );
        
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
            fs.unlinkSync(`./Image.${fileType}`);
        }

    }
    

    let productData = {
        name: request.body.name,
        price: request.body.price,
        description: request.body.description,
        category: request.body.category,
        Stock: request.body.Stock,
        images: imagesLinks,
        user: request.user.id
    }

    const product = await Product.create(productData);
    
    response.status(201).json({
        success: true,
        product,
    }); 
});




const getAllProducts = catchAsyncErrors( async (request, response, next) => {
    
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    console.log("total Product : " ,productsCount);
    console.log(request.query);
    const apiFeature = new ApiFeatures(Product.find(), request.query)
                            .search()
                            .filter();
    let products = await apiFeature.query;
    let filteredProductsCount = products.length;



    apiFeature.pagination(resultPerPage);

    // products = await apiFeature.query;

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
    
    let product = await Product.findById(request.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    // Images Start Here
    let images = [];

    if (typeof request.body.images === "string") {
        images.push(request.body.images);
    } else {
        images = request.body.images;
    }

    if (request?.files?.images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];
        if(request.files.images) {

            if(Array.isArray(request.files.images))
            for (let i = 0; i < request.files.images.length; i++) {
            
                const fileType = request.files.images[i].mimetype.replace("image/","");
                fs.writeFileSync(`./Image.${fileType}`, request.files.images[i].data)
    
                const result = await cloudinary.v2.uploader.upload(`Image.${fileType}`, {
                            folder: "products",
                        },
                            function(error, result) {
                                if(error) {
                                    console.log("cloud Error : ");
                                    fs.writeFile('./Output.txt', JSON.stringify(error), (err) => { 
                                        // In case of a error throw err. 
                                        if (err) throw err; 
                                    }) 
                                } else {
                                    console.log("cloud result ", result);
                                }
                            }
                );
    
    
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
                fs.unlinkSync(`./Image.${fileType}`);
            } else {
                const fileType = request.files.images.mimetype.replace("image/","");
                fs.writeFileSync(`./Image.${fileType}`, request.files.images.data)
    
                const result = await cloudinary.v2.uploader.upload(`Image.${fileType}`, {
                            folder: "products",
                        },
                            function(error, result) {
                                if(error) {
                                    console.log("cloud Error : ");
                                    fs.writeFile('./Output.txt', JSON.stringify(error), (err) => { 
                                        // In case of a error throw err. 
                                        if (err) throw err; 
                                    }) 
                                } else {
                                    console.log("cloud result ", result);
                                }
                            }
                );
    
    
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
                fs.unlinkSync(`./Image.${fileType}`);
            }
            
        }
        

        request.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    response.status(200).json({
        success: true,
        product,
    });
})

const deleteProduct = catchAsyncErrors( async (request, response, next) => {
    
    const product = await Product.findById(request.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    response.status(200).json({
        success: true,
        message: "Product Delete Successfully",
    });
})

const createProductReview = catchAsyncErrors( async (request, response, next) => {
    
    const { rating, comment, productId } = request.body;

    const review = {
        user: request.user._id,
        name: request.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);


    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === request.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === request.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    response.status(200).json({
        success: true,
    });
})


const getPorductReviews = catchAsyncErrors( async (request, response, next) => {
    const product = await Product.findById(request.query.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    response.status(200).json({
        success: true,
        reviews: product.reviews,
    });
})

const deleteReview = catchAsyncErrors( async (request, response, next) => {
    
    const product = await Product.findById(request.query.productId);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== request.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
        reviews,
        ratings,
        numOfReviews,
        },
        {
        new: true,
        runValidators: true,
        useFindAndModify: false,
        }
    );

    response.status(200).json({
        success: true,
    });
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