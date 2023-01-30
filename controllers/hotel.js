import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(200).send(newHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updateHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).send("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getOneHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).send(hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const allHotel = await Hotel.find({ ...others, cheapestPrice: { $gte: min || 50, $lte: max || 999 } }).limit(req.query.limit);
    res.status(200).send(allHotel);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).send(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "aparment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villasCount = await Hotel.countDocuments({ type: "villas" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).send([
      { type: "Hotel", count: hotelCount },
      { type: "Aparment", count: apartmentCount },
      { type: "Resort", count: resortCount },
      { type: "Villas", count: villasCount },
      { type: "Cabin", count: cabinCount },
    ])
  } catch (error) {
    next(error)
  }
}
