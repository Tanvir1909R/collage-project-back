import { Router } from "express";
import { getOrders, notifyCustomerAccept, notifyCustomerReject, orderDelete, orderPaid, rentCar } from "./order.controller.js";

const route = Router()

route.patch('/reject-customer-notify',notifyCustomerReject)
route.patch('/accept-customer-notify',notifyCustomerAccept)
route.patch('/paid',orderPaid)
route.patch('/',rentCar)
route.get('/:id',getOrders)
route.delete('/:id',orderDelete)
export const orderRoute = route
// http://localhost:5173/