import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema({
  customerId: {
    type:Schema.Types.ObjectId,
    ref:"users",
    require:true
  },
  driverId: {
    type:Schema.Types.ObjectId,
    ref:"users",
    require:true
  },
  carId: {
    type:Schema.Types.ObjectId,
    ref:"cars",
    require:true
  },
  orderId: {
    type:String,
    require:true
  },
  paid: Boolean,
  hour: Number,
  totalPrice: Number,
  accept:Boolean,
},{ timestamps: true });

export const Order = model("orders", orderSchema);
