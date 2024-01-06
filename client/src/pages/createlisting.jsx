import React, { useState } from 'react';

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
    // postedBy is set on the server-side based on authenticated user
  });

// ...imports and the CreateListing component definition


  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // For nested objects like price and rooms, we need to handle them separately
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

    // Here you would typically send the formData to the server
    // For example:
    try {
      const response = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication headers if needed
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response data
      const data = await response.json();
      console.log(data);
      // Redirect or inform the user of success
    } catch (error) {
      console.error('Error during form submission:', error);
      // Handle errors, e.g., show user feedback
    }
  };

  // ...rest of the component


// ...rest of the component code

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center font-sans">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Create a New Listing</h1>
        
        {/* Form starts here */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ... Other input fields ... */}

          {/* Price Input */}
          <div className="space-y-2">
            <label htmlFor="price" className="text-lg font-medium text-gray-700">Price</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                id="price"
                name="price"
                min="0"
                max="1000000"
                value={formData.price.amount}
                onChange={handleChange}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
              />
              <span className="text-blue-600 font-medium">{`${formData.price.currency} ${formData.price.amount}`}</span>
            </div>
          </div>

          {/* Rooms Input */}
          <div className="grid grid-cols-2 gap-6">
            {/* Bedrooms Slider */}
            <div className="space-y-2">
              <label htmlFor="bedrooms" className="text-lg font-medium text-gray-700">Bedrooms</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  id="bedrooms"
                  name="bedrooms"
                  min="0"
                  max="10"
                  value={formData.rooms.bedrooms}
                  onChange={handleChange}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-blue-600 font-medium">{formData.rooms.bedrooms}</span>
              </div>
            </div>

            {/* Bathrooms Slider */}
            {/* Repeat for bathrooms, kitchens, and livingRooms */}
          </div>

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

