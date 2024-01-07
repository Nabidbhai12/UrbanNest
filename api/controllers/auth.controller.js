import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  console.log("REQ BODY", req.body);
  //extract name,email,password from req.body
  const { username, email, password } = req.body;
  const hashpassword = await bcryptjs.hash(password, 10);
  //create a model
  const newuser = new User({ username, email, password: hashpassword });
  //save the user
  try {
    await newuser.save();
    console.log("User created successfully");

    res.status(201).json({ message: "Signup success! Please login." });
  } catch (err) {
    next(err);
  }
};

//create a function signin
export const signin = async (req, res, next) => {
  //extract email and password from req.body
  //print
  console.log("REQ BODY from signin", req.body);
  const { email, password } = req.body;
  //find the user with email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  //compare the password
  const isMatch = bcryptjs.compareSync(password, user.password);
  //print user password
  console.log("pass:   ", user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  //generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  //cookie
  res.cookie("access_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 8 * 3600000),
  });
  //send token to client
  res.status(200).json({ token });
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res.cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).json({ token });
    } else {
      const generatedpassword = Math.random().toString(36).slice(-8);
      const hashpassword = await bcryptjs.hash(generatedpassword, 10);

      const newuser = new User({
        username: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        password: hashpassword,
        avatar: req.body.photo,
      });
      await newuser.save();
      console.log("User created successfully");
      const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET);
      res.cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(201).json({ message: "Signup success! Please login." });
    }
  } catch (err) {
    next(err);
  }
};
export const signout = async (req, res, next) => {
  try {
    console.log("signout");
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
