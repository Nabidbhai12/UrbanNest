import mongoose from "mongoose";
const rentListSchema = new mongoose.Schema({
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
    country: String,
    zipCode: String,
    coordinates: {
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
  rentAmount: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 
  rooms: {
    total: Number,
    bedrooms: Number,
    bathrooms: Number,
    kitchens: Number,
    livingRooms: Number
  },
  area: {
    value: Number, // Size in square feet or square meters
    unit: {
      type: String,
      enum: ['sqft', 'sqm']
    }
  },
  // Additional fields as needed (e.g., amenities, features, etc.)
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a geospatial index for location queries
rentListSchema.index({ 'location.coordinates': '2dsphere' });

const RentList = mongoose.model('RentList', rentListSchema);

export default RentList;