import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
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
        },
        priceSnapshot: {
          type: Number,
          required: true
        },
        productNameSnapshot: {
          type: String
        },
        selectedOptions: {
          type: Map,
          of: String
        },
        note: {
          type: String
        }
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Prevent duplicate products
cartSchema.pre("save", function (next) {
  const seen = new Set();
  for (const item of this.products) {
    if (seen.has(item.productId.toString())) {
      return next(new Error("Duplicate product in cart."));
    }
    seen.add(item.productId.toString());
  }
  next();
});

// Index for fast lookup
cartSchema.index({ "products.productId": 1 });

export default model("Cart", cartSchema);
