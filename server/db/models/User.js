import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    business_profile: {
      type: Schema.Types.ObjectId,
      ref: "BusinessProfile",
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
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
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "mod", "admin", "business"],
      default: "user",
    },
    is_active: {
      type: Boolean,
      default: true
    },
    // Profilo esteso (sarà completato dopo la registrazione)
    phone: String,
    address: String,
    cap: String,
    city: String,
    province: String,
    dateBirth: Date,
    codiceFiscale: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
