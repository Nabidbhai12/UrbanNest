import Listing from '../models/listing.model.js';
export const getListingsByType = async (req, res) => {
  try {
    // Assuming 'userId' is obtained from request params, query or authentication middleware (like JWT)
    const userId = req.user._id; // Or however you get the user's ID in your app

    // Fetch the lists concurrently
    const [wishlist, rented, bought] = await Promise.all([
      Listing.find({ postedBy: userId, listingType: 'wishlist' }).lean(),
      Listing.find({ postedBy: userId, listingType: 'rented' }).lean(),
      Listing.find({ postedBy: userId, listingType: 'bought' }).lean()
    ]);

    // Send the listings back to the client
    res.json({ wishlist, rented, bought });
  } catch (err) {
    // Error handling
    res.status(500).json({ message: err.message });
  }
};
