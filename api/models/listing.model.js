import mongoose from 'mongoose';

const propertyListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  images: [
    {
      url: String, // URL to the image
      caption: String
    }
  ],
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
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
  price: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  size: {
    type: Number, // Size in square feet
    required: true
  },
  rooms: {
    total: Number,
    bedrooms: Number,
    bathrooms: Number,
    kitchens: Number,
    livingRooms: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  propertyStatus: {
    type: String,
    enum: ['For Sale', 'For Rent'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a geospatial index on the location.coordinates field
propertyListingSchema.index({ 'location.coordinates': '2dsphere' });


// Create a geospatial index on the location.coordinates field

const Listing = mongoose.model('Listing', propertyListingSchema);

export default Listing;
