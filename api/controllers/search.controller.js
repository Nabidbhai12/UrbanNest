import Listing from '../models/listing.model.js';

export const getSearchResults= async (req, res) => {
    try {
        const query = buildSearchQuery(req.query);
        const properties = await Listing.find(query);
        res.json(properties);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};
const buildSearchQuery = (params) => {
    let query = {};
  
    // Text search for title and description
    if (params.title) {
      query.title = { $regex: params.title, $options: 'i' };
    }
    if (params.description) {
      query.description = { $regex: params.description, $options: 'i' };
    }
  
    // Price range
    if (params.minPrice || params.maxPrice) {
      query['price.amount'] = {};
      if (params.minPrice) {
        query['price.amount'].$gte = Number(params.minPrice);
      }
      if (params.maxPrice) {
        query['price.amount'].$lte = Number(params.maxPrice);
      }
    }
  
    // Property type and status
    if (params.propertyType) {
      query.propertyType = params.propertyType;
    }
    if (params.status) {
      query.status = params.status;
    }
  
    // Location filters
    if (params.location) {
      Object.keys(params.location).forEach(key => {
        if (params.location[key]) {
          query[`location.${key}`] = params.location[key];
        }
      });
    }
  
    // Feature and amenities filters
    if (params.features) {
      query.features = { $all: params.features };
    }
    if (params.amenities) {
      query.amenities = { $all: params.amenities };
    }
  
    // Area range
    if (params.minArea || params.maxArea) {
      query['area.value'] = {};
      if (params.minArea) {
        query['area.value'].$gte = Number(params.minArea);
      }
      if (params.maxArea) {
        query['area.value'].$lte = Number(params.maxArea);
      }
    }
  
    // Room filters
    if (params.rooms) {
      Object.keys(params.rooms).forEach(key => {
        if (params.rooms[key]) {
          query[`rooms.${key}`] = params.rooms[key];
        }
      });
    }
  
    // Contact filters
    if (params.contact) {
      Object.keys(params.contact).forEach(key => {
        if (params.contact[key]) {
          query[`contact.${key}`] = params.contact[key];
        }
      });
    }
  
    // Other filters like listType, propertyStatus, etc.
    if (params.listType) {
      query.listType = params.listType;
    }
    if (params.propertyStatus) {
      query.propertyStatus = params.propertyStatus;
    }
  
    return query;
  };
  
