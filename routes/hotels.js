import express from 'express'
import { createHotel, deleteHotel, updateHotel, getHotel } from '../controllers/hotel.js';

const router = express.Router();

router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel)
router.get('/', getHotel)



export default router;