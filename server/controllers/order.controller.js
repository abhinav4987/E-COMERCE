const Order = require("../models/order.model");
const Product = require("../models/product.model");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const newOrder = catchAsyncErrors(async (request, response, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = request.body;

    const newOrder = await Order.create ({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: request.user._id
    })

    response.status(201).json({
        success: true,
        newOrder
    });

});


const getSingleOrder = catchAsyncErrors(async (request, response, next) => {

    const order = await Order.findById(request.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    response.status(200).json({
        success: true,
        order,
    });
});

const myOrders = catchAsyncErrors(async (request, response, next) => {
    const orders = await Order.find({ user: request.user._id });

    response.status(200).json({
        success: true,
        orders,
    });
});

const getAllOrders = catchAsyncErrors(async (request, response, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    response.status(200).json({
        success: true,
        totalAmount,
        orders,
    });


});

const UpdateOrder = catchAsyncErrors(async (request, response, next) => {
    const order = await Order.findById(request.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("You have already delivered this order", 400));
    }

    if (request.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
        });
    }
    order.orderStatus = request.body.status;

    if (request.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    response.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}


const deleteOrder = catchAsyncErrors(async (request, response, next) => {
    const order = await Order.findById(request.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    await order.remove();

    response.status(200).json({
        success: true,
    });
});


module.exports = {
    deleteOrder,
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    UpdateOrder,
}