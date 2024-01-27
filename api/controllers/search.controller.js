import Listing from '../models/listing.model.js';
 // Adjust the path as necessary
 export const searchProperties = async (req, res, next) => {
  console.log("from search");

  try {
    let criteria = [];

    // Extract search parameters with consistent naming and validation
    const {
      saleType,
      propertyType,
      condition,
      city,
      zip,
      address,
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

    // Price Range
    if (priceRange_min || priceRange_max) {
      let priceCriteria = {};
      if (priceRange_min) {
        priceCriteria['price.amount'] = { '$gte': parseInt(priceRange_min) };
      }
      if (priceRange_max) {
        priceCriteria['price.amount'] = priceCriteria['price.amount'] || {};
        priceCriteria['price.amount']['$lte'] = parseInt(priceRange_max);
      }
      criteria.push(priceCriteria);
    }

    // Area Range
    if (areaRange_min || areaRange_max) {
      let sizeCriteria = {};
      if (areaRange_min) {
        sizeCriteria.size = { '$gte': parseInt(areaRange_min) };
      }
      if (areaRange_max) {
        sizeCriteria.size = sizeCriteria.size || {};
        sizeCriteria.size['$lte'] = parseInt(areaRange_max);
      }
      criteria.push(sizeCriteria);
    }

    // Bedrooms and Bathrooms
    if (beds) criteria.push({ 'rooms.bedrooms': { '$gte': parseInt(beds) } });
    if (baths) criteria.push({ 'rooms.bathrooms': { '$gte': parseInt(baths) } });

    // Location
    if (city || address || zip) {
      let locationCriteria = {};
      if (city) locationCriteria['location.city'] = new RegExp(city, 'i');
      if (address) locationCriteria['location.address'] = new RegExp(address, 'i');
      if (zip) locationCriteria['location.zipCode'] = zip;
      criteria.push(locationCriteria);
    }

    // Property Type, Condition, and Apartment Type
    if (propertyType) criteria.push({ propertyType: propertyType });
    if (condition) criteria.push({ condition: condition });
    if (apartmentType) criteria.push({ apartmentType: apartmentType });

    // Property Status
    if (saleType) {
      criteria.push({ propertyStatus: saleType === "sell" ? 'For Sale' : 'For Rent' });
    }

    // Construct the query using $or if there are multiple criteria
    let query;
    if (criteria.length > 1) {
      query = Listing.find({ $or: criteria });
    } else if (criteria.length === 1) {
      query = Listing.find(criteria[0]);
    } else {
      query = Listing.find({});
    }

    console.log(criteria);
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



  