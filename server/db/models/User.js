import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    business_profile: {
      type: Schema.Types.ObjectId,
      ref: "BusinessProfile",
    },
    // Nome e cognome compilabili dopo
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "mod", "admin", "business"],
      default: "user",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    // Recupero password (opzionale)
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    // Profilo esteso
    phone: String,
    address: String,
    cap: String,
    city: String,
    province: String,
    dateBirth: Date,
    fiscalCode: String,
  },
  { timestamps: true }
);

export default model("User", userSchema);
