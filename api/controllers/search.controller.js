import Listing from '../models/listing.model.js';
import RentList from '../models/rentlisting.model.js'; // Adjust the path as necessary

export const searchProperties = async (req, res, next) => {
  const { minPrice, maxPrice, minSize, maxSize, bedrooms, bathrooms, location, type } = req.body;
  console.log(minPrice);

  try {
      let query;
      let criteria = {};

      // Price Range
     // Price Range
      if (minPrice || maxPrice) {
        criteria['price.amount'] = {}; // Using dot notation for nested fields
        if (minPrice) criteria['price.amount']['$gte'] = parseInt(minPrice);
        if (maxPrice) criteria['price.amount']['$lte'] = parseInt(maxPrice);
      }


      // Area Range
      if (minSize || maxSize) {
          criteria.size = {};
          if (minSize) criteria.size['$gte'] = parseInt(minSize);
          if (maxSize) criteria.size['$lte'] = parseInt(maxSize);
      }

      // Bedrooms and Bathrooms
      if (bedrooms) criteria['rooms.bedrooms'] = parseInt(bedrooms);
      if (bathrooms) criteria['rooms.bathrooms'] = parseInt(bathrooms);

      // Location
      if (location) criteria['location.address'] = new RegExp(location, 'i'); // Case-insensitive search
      //print criteria
      console.log(criteria);

      // Determine the model based on the type of property
      if (type === 'rent') {
          query = RentList.find(criteria);
      } else {
        console.log("In regular listing");
          // Defaults to searching for sale properties
          query =Listing.find(criteria);
      }

      const properties = await query.exec();

      res.status(200).json(properties);
  } catch (error) {
      next(error);
  }
};
export const getListingById = async (req, res, next) => {
    const { listingId } = req.params; // Assuming the ID is passed as a URL parameter

    try {
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(listing);
    } catch (error) {
        next(error);
    }
};



  