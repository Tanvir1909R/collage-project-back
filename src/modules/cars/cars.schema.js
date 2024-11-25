import mongoose, { model, Schema } from "mongoose";

const carSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    perHourPrice:{
        type:Number,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    driverId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        require:true
    }
})

export const carsModel  = model('cars',carSchema)