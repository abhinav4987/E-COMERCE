const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")("sk_test_51JmPT9SE3PHY5nlnoWA4MWf7YNPPZDxkhG4wur0YpwPp3RGKQKlmjUyHGs4D7OS3t6XjpLgGnWRY03MRxsMoKzt400tYZubpMK");

exports.processPayment = (catchAsyncErrors(async (request, response, next) => {
    console.log(request.body);
    const myPayment = await stripe.paymentIntents.create({
        amount: request.body.amount,
        currency : "inr",
        metadata: {
            company: "Ecomerce",
        },
    });
    console.log(myPayment);
    response.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    });
}))


exports. sendStripeApiKey = catchAsyncErrors(async (request, response, next) => {
    response.status(200).json({
        stripeApiKey: "pk_test_51JmPT9SE3PHY5nlnq5vI2AIYETc3cvU0s6EPurSKIyaBXDDUF1VUd3ULc0i3xy4g5MFY8IPONMO1nKFvDFLz0tYD00oKuDoHbu"
    });
})