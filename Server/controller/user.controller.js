const UserModel = require("../Model/user.model");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    await UserModel.create(req.body);

    return res.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = user.password === password;
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    return res.json({
      message: "User logged in successfully",
      data : user
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  login,
  register,
};
