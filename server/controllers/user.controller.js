const crypto = require("crypto");
const cloudinary = require("cloudinary");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

const registerUser = catchAsyncErrors( async (request, response, next) => {

})

const loginUser = catchAsyncErrors( async (request, response, next) => {

})

const logout = catchAsyncErrors( async (request, response, next) => {

})

const forgotPassword = catchAsyncErrors( async (request, response, next) => {

})
const resetPassword = catchAsyncErrors( async (request, response, next) => {

})

const getUserDetails = catchAsyncErrors( async (request, response, next) => {

})


const updatePassword = catchAsyncErrors( async (request, response, next) => {

})

const updateProfile = catchAsyncErrors( async (request, response, next) => {

})

const getAllUser = catchAsyncErrors( async (request, response, next) => {

})

const getSingleUser = catchAsyncErrors( async (request, response, next) => {

})

const updateUserRole = catchAsyncErrors( async (request, response, next) => {

})

const delteUser = catchAsyncErrors( async (request, response, next) => {

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