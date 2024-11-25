import { User } from "../user/user.schema.js";
import { Order } from "./order.schema.js";
import envConfig from '../../envConfig/index.js'
import { carsModel } from "../cars/cars.schema.js";
import mongoose from "mongoose";

export const rentCar = async (req, res) => {
    try {
        const order = req.body;
        const result = await Order.create(order)
        
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
export const getOrders = async (req, res) => {
  try {
      const {id} = req.params
      
        const result = await Order.find({
          driverId:id
        })
        .populate('customerId')
        .populate('carId')
        
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const orderDelete = async (req, res) => {
  try {
      const {id} = req.params
      
        const result = await Order.deleteOne({
          _id:id
        })
        
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log(error.message);
    }
};
export const notifyCustomerReject = async (req, res) => {
  try {
      const {id} = req.body  //order ID
      
      const order = await Order.findOne({
        _id:id
      })
      .populate('carId');
      
      const carName = order.carId.name;
      const notificationObj = {
        message:`Your offer is rejected for ${carName}`,
        hour:order.hour,
        totalPrice: order.totalPrice,
      }
      
       await User.updateOne(
        {_id:order.customerId},
        {$push:{notification:notificationObj}}
      )
      
      res.status(200).json({
        success: true,
        // data: result,
      });
    } catch (error) {
      console.log(error);
    }
};
export const notifyCustomerAccept = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
      const {id} = req.body  //order ID
      
      const order = await Order.findOne({
        _id:id
      })
      .populate('carId');
      
      const carName = order.carId.name;
      const notificationObj = {
        message:`Your offer is accepted for ${carName}`,
        hour:order.hour,
        totalPrice: order.totalPrice,
        link: `${envConfig.web_link}/rent/${order.carId._id}`
      }
      const carStatusUpdate = {
        status:"on road"
      }
      const acceptStatus = {
        accept:true
      }
      await carsModel.updateOne(
        {_id:order.carId._id},
        {$set:carStatusUpdate}
      )
       await User.updateOne(
        {_id:order.customerId},
        {$push:{notification:notificationObj}}
      )
       await Order.updateOne(
        {_id:id},
        {$set:acceptStatus}
      )
      await session.commitTransaction();
      res.status(200).json({
        success: true,
        // data: result,
      });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
    } finally{
      session.endSession();
    }
}; 
export const orderPaid = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
      const {id} = req.body  //order ID
      
      const order = await Order.findOne({
        _id:id
      })
      .populate('carId');
      const carStatusUpdate = {
        status:"available"
      }
      const paidStatus = {
        paid:true
      }
      await carsModel.updateOne(
        {_id:order.carId._id},
        {$set:carStatusUpdate}
      )
       await Order.updateOne(
        {_id:id},
        {$set:paidStatus}
      )
      await session.commitTransaction();
      res.status(200).json({
        success: true,
        // data: result,
      });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
    } finally{
      session.endSession();
    }
}; 


  
