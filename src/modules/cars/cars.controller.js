import { User } from "../user/user.schema.js";
import { carsModel } from "./cars.schema.js";

export const createCar = async (req, res) => {
  try {
    const data = req.body
    const result = await carsModel.create(data);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCars = async (req, res) => {
  try {
    const result = await carsModel.find({});
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getSingleCar = async (req, res) => {
  try {
    console.log(req.params.id);

    const result = await carsModel.findOne({
      _id: req.params.id,
    }).populate("driverId")
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCategory = async (req, res) => {
  try {
    const categories = await carsModel.aggregate([
      {
        $group: {
          _id: "$brand",
        },
      },
      {
        $project: {
          category: "$_id",
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error.message);
  }
};

