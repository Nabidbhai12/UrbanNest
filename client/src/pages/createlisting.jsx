
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Here you would typically send the formData to the server
  //   // For example:
  //   try {
  //     const response = await fetch('/api/listing/addlisting', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Include authentication headers if needed
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     // Handle the response data
  //     const data = await response.json();
  //     console.log(data);
  //     // Redirect or inform the user of success
  //   } catch (error) {
  //     console.error('Error during form submission:', error);
  //     // Handle errors, e.g., show user feedback
  //   }
  // };

  // ...rest of the component


// ...rest of the component code

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationPicker from './map';




const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    price: {
      amount: 0,
      currency: 'USD'
    },
    propertyType: '',
    status: '',
    location: {
      address: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      coordinates: { type: 'Point', coordinates: [0, 0] }
    },
    features: [],
    amenities: [],
    area: {
      value: 0,
      unit: 'sqft'
    },
    rooms: {
      bedrooms: 1,
      bathrooms: 1,
      kitchens: 1,
      livingRooms: 1,
    },
    contact: {
      name: '',
      phone: '',
      email: ''
    },
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name.includes('.')) {
      const [key, subkey] = name.split('.');
      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: {
          ...prevFormData[key],
          [subkey]: type === 'number' ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'number' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit form logic here
  };
  const handleLocationChange = (latlng) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        coordinates: { type: 'Point', coordinates: [latlng.lng, latlng.lat] }
      }
    });
  };


  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center font-sans">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Create a New Listing</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-lg font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              rows="4"
            ></textarea>
          </div>

          {/* Price Input */}
          {/* Price Input */}
          <div className="space-y-2">
  <label htmlFor="price.amount" className="text-lg font-medium text-gray-700">Price</label>
  <input
    type="range"
    id="price.amount"
    name="price.amount"
    value={formData.price.amount}
    min="400000"
    max="40000000"
    step="1000"
    onChange={handleChange}
    className="w-full"
  />
  <span className="ml-2 text-sm text-gray-500">
    {formData.price.amount}
  </span>
</div>



          {/* ...existing price input code... */}

          {/* Rooms Input */}
          {/* Rooms Input */}
<div className="grid grid-cols-2 gap-6">
  {/* Bedrooms Input */}
  <div className="space-y-2">
    <label htmlFor="rooms.bedrooms" className="text-lg font-medium text-gray-700">Bedrooms</label>
    <input
      type="number"
      id="rooms.bedrooms"
      name="rooms.bedrooms"
      value={formData.rooms.bedrooms}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
    />
  </div>
  </div>

  <div className="grid grid-cols-2 gap-6">
  
  <div className="space-y-2">
    <label htmlFor="rooms.bathrooms" className="text-lg font-medium text-gray-700">Bathrooms</label>
    <input
      type="number"
      id="rooms.bathrooms"
      name="rooms.bathrooms"
      value={formData.rooms.bathrooms}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
    />
  </div>
  </div>


  <div className="grid grid-cols-2 gap-6">
  {/* Bedrooms Input */}
  <div className="space-y-2">
    <label htmlFor="rooms.kitchens" className="text-lg font-medium text-gray-700">Kitchens</label>
    <input
      type="number"
      id="rooms.kitchens"
      name="rooms.kitchens"
      value={formData.rooms.kitchens}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
    />
  </div>
  </div>

  <div className="grid grid-cols-2 gap-6">
  {/* Bedrooms Input */}
  <div className="space-y-2">
    <label htmlFor="rooms.livingRooms" className="text-lg font-medium text-gray-700">livingrooms</label>
    <input
      type="number"
      id="rooms.livingRooms"
      name="rooms.livingRooms"
      value={formData.rooms.livingRooms}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
    />
  </div>
  </div>
  

          {/* ...existing rooms input code... */}

          {/* Property Type Input */}
          <div className="space-y-2">
            <label htmlFor="propertyType" className="text-lg font-medium text-gray-700">Property Type</label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="">Select Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Status Input */}
        <div className="space-y-2">
        <label className="text-lg font-medium text-gray-700">Location</label>
        <LocationPicker onLocationChange={handleLocationChange} />
      </div>

          {/* Location Inputs */}
          {/* Add inputs for address, city, state, country, zip, and coordinates */}

          {/* Features and Amenities Inputs */}
          {/* Add inputs for features and amenities as needed */}

          {/* Area Input */}
          {/* Add input for area value and unit */}

          {/* Contact Information Inputs */}
          {/* Add inputs for contact name, phone, and email */}

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Submit Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
