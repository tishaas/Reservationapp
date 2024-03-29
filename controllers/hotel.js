import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js";
export const createHotel =async (req,res,next)=>{
    const newHotel = new Hotel(req.body)

    try{
        const savedHotel =await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(error){
        next(error);
    }
};

export const updateHotel =async (req,res,next)=>{
    try{
        const updatedHotel =await Hotel.findByIdAndUpdate(req.params.id,
            {$set:req.body},{new:true})
        res.status(200).json(updatedHotel)
    }catch(error){
        res.status(500).json(error)
    }
};

export const deleteHotel =async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id,{$set:req.body})
        res.status(200).json("Hotel has been deleted!!")
    }catch(error){
        res.status(500).json(error)
    }
};
//qurey =?featured=true gt-greater than lt-less than
export const getHotels =async (req,res,next)=>{
    // const {min,max,...others}=req.query
    try{
        const hotels =await Hotel.find({cheapestPrice:{$gt:req.query.min ||1,$lt: req.query.max ||999}}).limit(req.query.limit|| 10)
        res.status(200).json(hotels)
    }catch(error){
        next(error)
    }
};


export const getHotel =async (req,res,next)=>{
    try{
        const hotel =await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(error){
        res.status(500).json(error)
    }
};
//countByCity?cities=Berline postman
export const countByCity =async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list =await Promise.all(cities.map(city=>{
            return  Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }catch(error){
        next(error)
    }
};

export const countByType =async (req,res,next)=>{
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const appartmentCount =await Hotel.countDocuments({type:"appartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})
        const villaCount = await Hotel.countDocuments({type:"villa"})

        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"appartment",count:appartmentCount},
            {type:"resort",count:resortCount},
            {type:"cabin",count:cabinCount },
            {type:"villa",count:villaCount },
            
        ])
    }catch(error){
        next(error)
    }
};

export const getHotelRooms = async(req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    }catch(err){
        console.log(err)
        //next(err)
    }
}


