const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        products: [
            {
                productId: String,
                quantity: Number,
                name: String,
                price: Number
            }
        ],
        active: {
            type: Boolean,
            default: true
        },
        modifiedOn: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Cart", CartSchema);
