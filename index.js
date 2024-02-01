import  express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
dotenv.config()
const secret = process.env.JWT

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log('connected to Database')
    }catch(error){
        throw error
    }
}
//mongodb+srv://tisha:tisha**@cluster0.ufixmyn.mongodb.net/hres
mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!")
})
//middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/users",usersRoute)

app.use((error,req,res,next)=>{
    const errorStatus = error.status ||500
    const errorMessage = error.message ||"Something went wrong!"
    return res.status(errorStatus).json({
        sucess:false,
        status:errorStatus,
        message:errorMessage
    })
})
app.listen(8800,()=>{
    connect()
    console.log("Server connected")
})
export default secret