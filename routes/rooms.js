import express  from "express"
import { createRoom,updateRoom,
    deleteRoom,getRoom,getRooms,updateRoomAvailability
} from "../controllers/room.js"
import {verifyAdmin} from  "../utils/verifyToken.js"
const router = express.Router()

router.post('/:hotelid',createRoom)

//update
router.put('/:id',updateRoom)
router.put('/availability/:id',updateRoomAvailability)

//delete
router.delete('/:id/:hotelid',deleteRoom)

//get
router.get('/:id',getRoom)

//getall
router.get('/',getRooms)

export default router