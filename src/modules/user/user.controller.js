import { User } from "./user.schema.js";

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    if (data.accountType === "driver") {
      data.orders = [];
    }
    const result = await User.create(data);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await User.updateOne({ _id: id }, { $set: data });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const getSingleUser = async (req, res) => {
  try {
    const data = req.params.email;
    const result = await User.findOne({
      email: data,
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const getNotification = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findOne(
        {_id:id},
        {notification:1}
    )
    res.status(200).json({
      success: true,
      data:result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
