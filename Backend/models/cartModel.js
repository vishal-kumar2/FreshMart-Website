import mongoose from "mongoose";

/* ================= CART ITEM SCHEMA ================= */
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    image: String,
    price: Number,
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    unit: {
      type: String,
      enum: ["kg", "gm", "ltr", "ml", "pcs"],
      required: true,
    },
    subtotal: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);


/* ================= CART SCHEMA ================= */
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },

    items: [cartItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

/* ================= AUTO CALCULATIONS ================= */
cartSchema.pre("save", function () {
  let totalItems = 0;
  let totalPrice = 0;

  this.items.forEach((item) => {
    item.subtotal = item.price * item.quantity;
    totalItems += item.quantity;
    totalPrice += item.subtotal;
  });

  this.totalItems = totalItems;
  this.totalPrice = totalPrice;

});

export const Cart = mongoose.model("Cart", cartSchema);
