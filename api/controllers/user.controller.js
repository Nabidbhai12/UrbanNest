import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import UserList from "../models/userlist.model.js";
import Listing from "../models/listing.model.js";
export const verifyLoginStatus = (req, res) => {
  const token = req.cookies["access_token"];

  // If there's no token, the user is not logged in
  if (!token) {
    console.log("No token found");
    return res.json({ isLoggedIn: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(`Error verifying JWT: ${err}`);
      // Token is not valid or has other issues
      return res.json({ isLoggedIn: false });
    }

    const currentTime = Date.now() / 1000; // Get current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      // Token has expired
      return res.json({ isLoggedIn: false });
      console.log("Token has expired");
    }
    // The token is valid and hasn't expired yet
    console.log("Token is valid and not expired");

    // Token is valid and not expired
    return res.json({ isLoggedIn: true });
  });
};

export const authenticateToken = (req, res, next) => {
  console.log("from authenticateToken");
  const token = req.cookies["access_token"];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Token is not valid or expired
    const currentTime = Date.now() / 1000; // Get current time in seconds
    if (decoded.exp < currentTime) {
      return res.sendStatus(403); // Token has expired
    }
    req.user = decoded; // Add decoded token to the request object
    console.log("Auth done");
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

export const getUserDetailsByID = async (req, res) => {
  const { userID } = req.params;
  
  try{
    const user = await User.findById(userID);

    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    //console.log(user);
    const response = {
      username : user.username,
      email : user.email,
      contactNumber : user.contactNumber,
      avatar : user.avatar,
      profilePicture : user.profilePicture,
    }  

    res.json(response);

  } catch(error){
    console.error(error);
  }
}

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
    console.log("Price range: " + req.body.priceRange);
    const {
      title,
      description,
      district,
      area,
      zip,
      address,
      priceRange,
      areaRange,
      beds,
      baths,
      saleType,
      apartmentType,
      condition,
      propertyType,
      latitude,
      longitude
    } = req.body;

    console.log("Before image URL");
    const imageUrls = req.files.map((file) => file.path); // Cloudinary URLs
    console.log("After image URL");

    //console.log("Req body: " + req.body);
    //print imageurl
    console.log("Image URLs:" + imageUrls);
    // // Extract the user ID from the token
    // const token = req.headers.authorization.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = req.user.id;
    let propertyStatus = saleType === "sell" ? "For Sale" : "For Rent";

    console.log("Property status: " + propertyStatus);

    // Create a new property listing
    const newProperty = new Listing({
      title,
      description,
      images: imageUrls.map((url) => ({ url, caption: "Property Image" })),
      location: {
        district: district,
        area: area,
        zipCode: zip,
        address: address,
        coordinates: { // Ensure these are in GeoJSON format for geospatial queries
          type: "Point",
          coordinates: [longitude, latitude], // Note: GeoJSON format is [longitude, latitude]
        }
      },
      price: {
        amount: parseInt(priceRange[0], 10),
        currency: "BDT", // Assuming you're dealing with USD, you can change it accordingly
      },
      size: parseInt(areaRange[0], 10),
      rooms: {
        bedrooms: parseInt(beds[0], 10),
        bathrooms: parseInt(baths[0], 10)
      },
      owner: userId,
      propertyStatus,
      apartmentType,
      condition,
      propertyType,
      propertyStatus,
    });

    console.log("Listing created");

    console.log(newProperty);

    // Save the property listing
    const savedProperty = await newProperty.save();

    await UserList.findOneAndUpdate(
      { user: userId },
      { $push: { sellingList: savedProperty._id } },
      { new: true, upsert: true } // Create a new document if it doesn't exist
    );

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
export const markPropertyAsSold = async (req, res, next) => {
  const { propertyId } = req.params; // Assuming the property ID is sent in the request body
  const userId = req.user.id;

  try {
    // Remove from sellingList
    const userListUpdate = await UserList.findOneAndUpdate(
      { user: userId },
      { $pull: { sellingList: propertyId } },
      { new: true }
    );

    // Add to soldList
    if (userListUpdate) {
      await UserList.findOneAndUpdate(
        { user: userId },
        { $push: { soldList: propertyId } },
        { new: true }
      );
    }

    // Delete the property listing from Listing collection
    const deletedProperty = await Listing.findByIdAndRemove(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found or already removed" });
    }

    res.json({ message: "Property marked as sold and removed from listings successfully", deletedProperty });
  } catch (error) {
    next(error);
  }
};

//deleteprofile
//a function to send all the details(name,email,picture..all user details except password) to frontend
//updatepassword()
export const isPropertyInWishlist = async (req, res, next) => {
  const { propertyId } = req.params; // Assuming the property ID is sent as a URL parameter
  const userId = req.user.id;

  try {
    const userLists = await UserList.findOne({ user: userId }, 'wishList');
    const isPropertyInList = userLists.wishList.some((id) => id.toString() === propertyId);

    res.json({ isInWishlist: isPropertyInList });
  } catch (error) {
    next(error);
  }
};

export const getUserWishlist = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Use populate to get detailed information about each property in the wishlist
    const userLists = await UserList.findOne({ user: userId }).populate('wishList');
    if (!userLists) {
      return res.status(404).json({ message: "User wishlist not found." });
    }

    res.json(userLists.wishList);
  } catch (error) {
    next(error);
  }
};
export const addToWishList = async (req, res, next) => {
  const { propertyId } = req.params; // Assuming the property ID is sent in the request body
  const userId = req.user.id;

  try {
    await UserList.findOneAndUpdate(
      { user: userId },
      { $addToSet: { wishList: propertyId } }, // Use $addToSet to avoid duplicates
      { new: true, upsert: true }
    );
    res.json({ message: "Property added to wishlist successfully" });
  } catch (error) {
    next(error);
  }
};
export const removeFromWishList = async (req, res, next) => {
  const { propertyId } = req.params;
  const userId = req.user.id;

  try {
    await UserList.findOneAndUpdate(
      { user: userId },
      { $pull: { wishList: propertyId } }, // Use $pull to remove the property
      { new: true }
    );
    res.json({ message: "Property removed from wishlist successfully" });
  } catch (error) {
    next(error);
  }
};

//now write removefromwishlist

export const getUserSoldlist = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Use populate to get detailed information about each property in the wishlist
    const userLists = await UserList.findOne({ user: userId }).populate('soldList');
    if (!userLists) {
      return res.status(404).json({ message: "User wishlist not found." });
    }

    res.json(userLists.wishList);
  } catch (error) {
    next(error);
  }
};


export const getUserSellinglist = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Use populate to get detailed information about each property in the wishlist
    const userLists = await UserList.findOne({ user: userId }).populate('sellingList');
    if (!userLists) {
      return res.status(404).json({ message: "User wishlist not found." });
    }

    res.json(userLists.wishList);
  } catch (error) {
    next(error);
  }
};
