import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

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
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel)
    }
    catch(err) {
        next(err);
    }
} 


export const getHotels = async (req, res, next) => {
    const {min, max, ...others} = req.query;

    try {
        const getHotels = await Hotel.find({...others, cheapestPrice: {$gt: min || 1, $lt: max || 999},
        })
        .limit(req.query.limit);
        res.status(200).json(getHotels)
    }
    catch(err) {
        next(err);
    }
} 


export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };



export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const apartmentCount = await Hotel.countDocuments({ type: "apartments"})
        const villaCount = await Hotel.countDocuments({ type: "villas"})
        const resortCount = await Hotel.countDocuments({ type: "resorts"})
        const cabinCount = await Hotel.countDocuments({ type: "cabins"})

        res.status(200).json([
                {type: "hotels", count: hotelCount},
                {type: "apartments", count: apartmentCount},
                {type: "villas", count: villaCount},
                {type: "resorts", count: resortCount},
                {type: "cabins", count: cabinCount}
        ])
    }
    catch(err) {
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room);
        })
        );
        res.status(200).json(list);
    }
    catch(err) {
        next(err);
    }
}
