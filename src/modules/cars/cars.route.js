import { Router } from "express";
import { createCar, getCars, getCategory, getSingleCar } from "./cars.controller.js";

const route = Router()

route.get('/category',getCategory)
route.get('/',getCars)
route.post('/',createCar)
route.get('/:id',getSingleCar)
export const carsRoute = route