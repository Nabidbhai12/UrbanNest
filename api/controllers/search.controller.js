import Listing from '../models/listing.model.js';
 // Adjust the path as necessary

export const searchProperties = async (req, res, next) => {
  console.log("form search");

    const { minPrice, maxPrice, minSize, maxSize, bedrooms, bathrooms, kitchens, livingRooms, location, city, address,state, zipCode, type, propertyType,condition,apartmentType } = req.body;
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
      if(kitchens) criteria['rooms.kitchens']=parseInt(kitchens);
        if(livingRooms) criteria['rooms.livingRooms']=parseInt(livingRooms);


      // Location
     // Location
     if (city || address || zipCode) {
      criteria.location = {};
      if (city) criteria.location['city'] = new RegExp(city, 'i');
      if (address) criteria.location['address'] = new RegExp(address, 'i');
      if (zipCode) criteria.location['zipCode'] = zipCode;
  }

  // Property Type, Condition, and Apartment Type
  if (propertyType) criteria.propertyType = propertyType;
  if (condition) criteria.condition = condition;
  if (apartmentType) criteria.apartmentType = apartmentType;
      //print criteria
      console.log(criteria);

      if (type) {
        criteria.propertyStatus = type === "sell" ? 'For Sale' : 'For Rent';
    }

      // Determine the model based on the type of property
       query = Listing.find(criteria);

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



  