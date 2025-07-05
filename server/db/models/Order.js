import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        status: {
          type: String,
          enum: ["preparing", "shipped", "completed"],
          default: "preparing",
        },
      },
    ],
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
