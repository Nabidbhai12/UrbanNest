import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import UserList from "../models/userlist.model.js";
import Listing from "../models/listing.model.js";
export const authenticateToken = (req, res, next) => {
  console.log("au");
  // console.log(req);
  // const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.cookies["access_token"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
export const getUserDetails = async (req, res) => {
  const userId = req.user.id; // Extract user ID from token

  try {
    const user = await User.findById(userId).select("-password"); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);

    res.json({ message: "User details fetched successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user details", error: error.message });
  }
};

// Function to update user profile and password
export const updateProfile = async (req, res) => {
  const userId = req.user.id; // Extract user ID from token
  const { currentPassword, newPassword, ...updates } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password update is requested
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.password = hashedPassword;
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
export const addPropertyForSale = async (req, res, next) => {
  console.log("addPropertyForSale called");
  try {
    console.log(req.body);
    const {
      title,
      description,
      location,
      priceRange,
      areaRange,
      rooms,
      saleType,
      apartmentType,
      condition,
      propertyType,
    } = req.body;
    const imageUrls = req.files.map((file) => file.path); // Cloudinary URLs
    //print imageurl
    console.log("Image URLs:" + imageUrls);
    // // Extract the user ID from the token
    // const token = req.headers.authorization.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = req.user.id;
    let propertyStatus= saleType === "sell" ? "For Sale" : "For Rent";

    console.log("Property status: " + propertyStatus)

    // Create a new property listing
    const newProperty = new Listing({
      title,
      description,
      images: imageUrls.map((url) => ({ url, caption: "Property Image" })),
      location,
      priceRange,
      size: parseInt(areaRange[0], 10),
      rooms,
      owner: userId,
      propertyStatus,
      apartmentType,
      condition,
      propertyType,
      propertyStatus,
    });

    // Save the property listing
    const savedProperty = await newProperty.save();

    console.log("Saved property: " + savedProperty);

    // Update user's list with the new property
    // ... rest of your code ...

    res.status(201).json({
      message: "Property added for sale successfully",
      property: savedProperty,
    });
  } catch (error) {
    next(error);
  }
};

//deleteprofile
//a function to send all the details(name,email,picture..all user details except password) to frontend
//updatepassword()

export const getUserWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userLists = await UserList.findOne({ user: userId }).populate(
      "wishList"
    );
    res.json(userLists.wishList);
  } catch (error) {
    next(error);
  }
};
export const getUserBoughtlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userLists = await UserList.findOne({ user: userId }).populate(
      "boughtList"
    );
    res.json(userLists.boughtList);
  } catch (error) {
    next(error);
  }
};
export const getUserSoldlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userLists = await UserList.findOne({ user: userId }).populate(
      "soldList"
    );
    res.json(userLists.soldList);
  } catch (error) {
    next(error);
  }
};
export const getUserSellinglist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userLists = await UserList.findOne({ user: userId }).populate(
      "sellingList"
    );
    res.json(userLists.sellingList);
  } catch (error) {
    next(error);
  }
};
