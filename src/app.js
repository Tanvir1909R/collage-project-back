import express from 'express'
import cors from 'cors'
import { carsRoute } from './modules/cars/cars.route.js'
import { userRoute } from './modules/user/user.route.js'
import { orderRoute } from './modules/order/order.route.js'

const app = express()

app.use(cors())
app.use(express.json())



app.use('/cars',carsRoute)
app.use('/user',userRoute)
app.use('/order',orderRoute)

app.use('/',(req,res)=>{
    res.json({
        message:"hello"
    })
})

export default app