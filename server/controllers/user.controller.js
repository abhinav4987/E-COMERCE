const crypto = require("crypto");
const cloudinary = require("cloudinary");

const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user.model");

// ErrorHander
const registerUser = catchAsyncErrors( async (request, response, next) => {

    console.log("register request recieved  :  ", request);
    // console.log(request);
    const myCloud = await cloudinary.v2.uploader.upload(request.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    // cloudinary.v2.uploader.upload(request.body.avatar,
    //     {
    //         folder: "avatars",
    //         width: 150,
    //         crop: "scale",
    //     }, 
    //     function(error, result) {
            
    //         if(error) {
    //             console.log("cloud error ", error);
    //         } else {
    //             console.log("cloud result ", result);
    //         }
    //     }
    // );
    
    console.log("stage 2 : ",myCloud);
    const { name, email, password } = request.body;
    
    const user = await User.create({
        name,
        email,
        password,
        // avatar: {
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url,
        // },
    });
    // console.log("stage 3");
    sendToken(user, 201, response);
})


const loginUser = catchAsyncErrors( async (request, response, next) => {
    
    console.log(" login request");
    const { email, password } = request.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    console.log("stage 2");
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    console.log(" user found");
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    
    console.log("semding 2000");;
    sendToken(user, 200, response);
})

const logout = catchAsyncErrors( async (request, response, next) => {
    response.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    
    response.status(200).json({
        success: true,
        message: "Logged Out",
    });
})

const forgotPassword = catchAsyncErrors( async (request, response, next) => {
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${request.protocol}://${request.get("host")}/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });
    
        response.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save({ validateBeforeSave: false });
    
        return next(new ErrorHandler(error.message, 500));
    }
})

const resetPassword = catchAsyncErrors( async (request, response, next) => {

})

const getUserDetails = catchAsyncErrors( async (request, response, next) => {
    const user = await User.findById(request.user.id);

    res.status(200).json({
        success: true,
        user,
    });
})


const updatePassword = catchAsyncErrors( async (request, response, next) => {

})

const updateProfile = catchAsyncErrors( async (request, response, next) => {

    const newUserData = {
        name: request.body.name,
        email: request.body.email,
    };

    if (request.body.avatar !== "") {
        const user = await User.findById(request.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(request.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
    
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(request.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    response.status(200).json({
        success: true,
    });

})

const getAllUser = catchAsyncErrors( async (request, response, next) => {
    const users = await User.find();

    response.status(200).json({
        success: true,
        users,
    });
})

const getSingleUser = catchAsyncErrors( async (request, response, next) => {
    const user = await User.findById(request.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
})

const updateUserRole = catchAsyncErrors( async (request, response, next) => {
    const newUserData = {
        name: request.body.name,
        email: request.body.email,
        role: request.body.role,
    };

    await User.findByIdAndUpdate(request.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
})

const delteUser = catchAsyncErrors( async (request, response, next) => {
    const user = await User.findById(request.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${request.params.id}`, 400)
        );
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    response.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
})


module.exports = {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    delteUser,
}