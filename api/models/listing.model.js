const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String
    }
  }],
  price: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'BDT', 'GBP'], // Enum for supported currencies
    }
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['apartment', 'house', 'condo', 'land', 'commercial']
  },
  status: {
    type: String,
    required: true,
    enum: ['available', 'sold', 'rented', 'pending', 'archived']
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    coordinates: { // GeoJSON format for geospatial queries
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    }
  },
  features: [{
    type: String
  }],
  amenities: [{
    type: String
  }],
  area: {
    value: Number,
    unit: {
      type: String,
      enum: ['sqft', 'sqm']
    }
  },
  rooms: {
    bedrooms: Number,
    bathrooms: Number,
    kitchens: Number,
    livingRooms: Number,
  },
  contact: {
    name: String,
    phone: String,
    email: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  listType:{
    type: String,
    required: true,
    enum: ['wishlist', 'bought','sold']
  },
  propertyStaus:{
    type: String,
    required: true,
    enum: ['buy', 'sell','rent']
  },
  

});

// Create a geospatial index on the location.coordinates field
listingSchema.index({ 'location.coordinates': '2dsphere' });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
