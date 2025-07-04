import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // Ogni utente ha un solo carrello
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1
        }
      }
    ]
  },
  { timestamps: true }
);

export default model("Cart", cartSchema);
