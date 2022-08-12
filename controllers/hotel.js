import Hotel from '../models/Hotel.js'


export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }
    catch(err) {
        next(err);
    }
}

export const updateHotel =  async (req, res, next) => {
    try {
    const savedHotel = await Hotel.findByIdAndUpdate(req.params.id, 
        { $set: req.body },
        { new: true }
        )
    res.status(200).json(savedHotel);
}
    catch(err) {
        next(err);
    } 
} 

export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedHotel)
    }
    catch(err) {
        next(err);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const getHotels = await Hotel.find();
        res.status(200).json(getHotels)
    }
    catch(err) {
        next(err);
    }
} 