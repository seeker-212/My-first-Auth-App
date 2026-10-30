import userModel from "../models/userModel.js";

//GET USER DETAILS
export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    res.json({
        success: true,
        userData: {
            name: user.name,
            isAccountVerified: user.isAccountVerified
        }
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
