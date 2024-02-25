import Listing from '../models/listing.model.js';
import { ObjectId } from 'mongodb';
 // Adjust the path as necessary
 export const searchProperties = async (req, res, next) => {
  console.log("from search");
  console.log(req.body);

  try {
      const {
          saleType,
          propertyType,
          condition,
          district,
          area,
          areaRange_min,
          areaRange_max,
          priceRange_min,
          priceRange_max,
          beds,
          baths,
          apartmentType,
      } = req.body;

      // Print all the read values
      console.log(areaRange_min, areaRange_max, priceRange_min, priceRange_max);

      // Initialize an array to hold the individual queries
      let queries = [];

      // Price Range
      if (priceRange_min || priceRange_max) {
          const priceQuery = {};
          if (priceRange_min) {
              priceQuery['price.amount'] = { '$gte': parseInt(priceRange_min) };
          }
          if (priceRange_max) {
              priceQuery['price.amount'] = priceQuery['price.amount'] || {};
              priceQuery['price.amount']['$lte'] = parseInt(priceRange_max);
          }
          queries.push(Listing.find(priceQuery));
      }

      // Area Range
      if (areaRange_min || areaRange_max) {
          const areaQuery = {};
          if (areaRange_min) {
              areaQuery['size'] = { '$gte': parseInt(areaRange_min) };
          }
          if (areaRange_max) {
              areaQuery['size'] = areaQuery['size'] || {};
              areaQuery['size']['$lte'] = parseInt(areaRange_max);
          }
          queries.push(Listing.find(areaQuery));
      }

      // Bedrooms and Bathrooms
      if (beds) {
          const bedsQuery = { 'rooms.bedrooms': { '$gte': parseInt(beds) } };
          queries.push(Listing.find(bedsQuery));
      }
      if (baths) {
          const bathsQuery = { 'rooms.bathrooms': { '$gte': parseInt(baths) } };
          queries.push(Listing.find(bathsQuery));
      }

      // Location (City, Address, Zip)
      if (district || area) {
          const locationQuery = {};
          if (district) locationQuery['location.district'] = new RegExp(district, 'i');
          if (area) locationQuery['location.area'] = new RegExp(area, 'i');
          queries.push(Listing.find(locationQuery));

      }

      // Property Type, Condition, and Apartment Type
      if (propertyType) {
          const propertyTypeQuery = { propertyType: propertyType };
          queries.push(Listing.find(propertyTypeQuery));
      }
      if (condition) {
          const conditionQuery = { condition: condition };
          queries.push(Listing.find(conditionQuery));
      }
      if (apartmentType) {
          const apartmentTypeQuery = { apartmentType: apartmentType };
          queries.push(Listing.find(apartmentTypeQuery));
      }

      // Property Status
      if (saleType) {
          const saleTypeQuery = { propertyStatus: saleType === "sell" ? 'For Sale' : 'For Rent' };
          queries.push(Listing.find(saleTypeQuery));
      }

      // Aggregate results from all queries
      const queryResults = await Promise.all(queries);

      // Combine results and filter out duplicates
      const combinedProperties = [].concat(...queryResults); // Flatten the array of arrays
     // console.log(combinedProperties);
      console.log("searching...");
      const uniqueProperties = Object.values(
        combinedProperties.reduce((uniqueMap, property) => {
          const id = property._id; // Don't convert to string
          if (!uniqueMap[id]) {
            uniqueMap[id] = property;
          }
          return uniqueMap;
        }, {})
      );
      
      
      console.log("done sorting...")

      //console.log(uniqueProperties);
      res.status(200).json(uniqueProperties);
  } catch (error) {
      next(error);
  }
};
//check whether the search works properly or not

export const getListingById = async (req, res, next) => {
    console.log("getListingById called");
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



  