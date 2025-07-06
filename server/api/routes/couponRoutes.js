import express from "express";
import {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/CouponController.js";
import { authUser } from "../../middleware/authUser.js";

const router = express.Router();

// Crea coupon (protetto)
router.post("/", authUser(), createCoupon);

// Recupera tutti i coupon (pubblico)
router.get("/", getCoupons);

// Recupera un coupon singolo (pubblico)
router.get("/:id", getCoupon);

// Aggiorna coupon (protetto)
router.put("/:id", authUser(), updateCoupon);

// Elimina coupon (protetto)
router.delete("/:id", authUser(), deleteCoupon);

export default router;
