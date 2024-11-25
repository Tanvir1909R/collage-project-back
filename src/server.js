import mongoose from 'mongoose'
import envConfig from './envConfig/index.js';
import app from './app.js';

const db = async()=>{
    try {
        await mongoose.connect(`${envConfig.databaseUrl}`)
        app.listen(5000,()=>{
            console.log('server start');     
        })
    } catch (error) {
        console.log(error.message);
        
    }
}

db()