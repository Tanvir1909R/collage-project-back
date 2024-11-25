import { Router } from "express";
import { createUser, getNotification, getSingleUser, updateUser } from "./user.controller.js";

const route = Router()

route.post('/',createUser)
route.get('/notification/:id', getNotification)
route.patch('/:id',updateUser)
route.get('/:email',getSingleUser)
export const userRoute = route