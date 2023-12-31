import React, { useState } from 'react';

export default function Search() {
  const [filters, setFilters] = useState({
    saleType: 'sell', // 'sell' or 'rent'
    propertyType: 'residential', // 'commercial' or 'residential'
    condition: 'new', // 'new', 'used', or 'under-construction'
    city: '',
    zip: '',
    address: '',
    areaRange: [0, 1000],
    priceRange: [0, 1000000],
    beds: 1,
    baths: 1,
    apartmentType: 'house', // 'house', 'penthouse', 'duplex', 'studio'
    email: '',
    contactInfo: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value.split(',').map(Number),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted filters:', filters);
    // Add your search handling logic here, such as an API call
  };

  return (
<div className="container mx-auto p-8">
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex flex-col space-y-2">
      <div>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="saleType"
            value="sell"
            checked={filters.saleType === 'sell'}
            onChange={handleInputChange}
          />
          <span className={`rounded-full px-4 py-2 text-lg ${filters.saleType === 'sell' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white cursor-pointer transition duration-300 ease-in-out`}>
            Sell
          </span>
        </label>
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="saleType"
            value="rent"
            checked={filters.saleType === 'rent'}
            onChange={handleInputChange}
          />
          <span className={`rounded-full px-4 py-2 text-lg ${filters.saleType === 'rent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white cursor-pointer transition duration-300 ease-in-out`}>
            Rent
          </span>
        </label>
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="propertyType"
            value="commercial"
            checked={filters.propertyType === 'commercial'}
            onChange={handleInputChange}
          />
          <span className={`rounded-full px-4 py-2 text-lg ${filters.propertyType === 'commercial' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white cursor-pointer transition duration-300 ease-in-out`}>
            Commercial
          </span>
        </label>
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="propertyType"
            value="residential"
            checked={filters.propertyType === 'residential'}
            onChange={handleInputChange}
          />
          <span className={`rounded-full px-4 py-2 text-lg ${filters.propertyType === 'residential' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white cursor-pointer transition duration-300 ease-in-out`}>
            Residential
          </span>
        </label>
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="apartmentCondition"
            value="new"
            checked={filters.apartmentCondition === 'new'}
            onChange={handleInputChange}
          />
          <span className={`rounded-full px-4 py-2 text-lg ${filters.apartmentCondition === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white cursor-pointer transition duration-300 ease-in-out`}>
            New
          </span>
        </label>
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="apartmentCondition"
            value="used"
            checked={filters.apartmentCondition === 'used'}
            onChange={handleInputChange}
          />
          <span className={`rounded-full px-4 py-2 text-lg ${filters.apartmentCondition === 'used' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white cursor-pointer transition duration-300 ease-in-out`}>
            Used
          </span>
        </label>
      </div>
    </div>
  

   

        {/* Add more inputs for other filters like 'propertyType', 'condition', etc. */}

        <div className="flex space-x-4">
          <label className="block">
            <span className="text-gray-700">Area (sqft)</span>
            <input
              type="range"
              name="areaRange"
              value={filters.areaRange.join(',')}
              min="0"
              max="10000"
              step="100"
              onChange={handleRangeChange}
              className="block w-full mt-1"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Price</span>
            <input
              type="range"
              name="priceRange"
              value={filters.priceRange.join(',')}
              min="0"
              max="1000000"
              step="10000"
              onChange={handleRangeChange}
              className="block w-full mt-1"
            />
          </label>
          <label className="block">
  <span className="text-gray-700">Price</span>
  <input
    type="range"
    name="priceRange"
    value={filters.priceRange.join(',')}
    min="0"
    max="1000000"
    step="10000"
    onChange={handleRangeChange}
    className="block w-full mt-1"
  />
</label>

<label className="block">
  <span className="text-gray-700">Beds</span>
  <select
    name="beds"
    value={filters.beds}
    onChange={handleInputChange}
    className="block w-full mt-1"
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    {/* Add more options as needed */}
  </select>
</label>

<label className="block">
  <span className="text-gray-700">Baths</span>
  <select
    name="baths"
    value={filters.baths}
    onChange={handleInputChange}
    className="block w-full mt-1"
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    {/* Add more options as needed */}
  </select>
</label>

<label className="block">
  <span className="text-gray-700">Apartment Type</span>
  <select
    name="apartmentType"
    value={filters.apartmentType}
    onChange={handleInputChange}
    className="block w-full mt-1"
  >
    <option value="studio">Studio</option>
    <option value="1br">1 Bedroom</option>
    <option value="2br">2 Bedroom</option>
    {/* Add more options as needed */}
  </select>
</label>

<label className="block">
  <span className="text-gray-700">Email</span>
  <input
    type="email"
    name="email"
    value={filters.email}
    onChange={handleInputChange}
    className="block w-full mt-1"
  />
</label>

<label className="block">
  <span className="text-gray-700">Contact Info</span>
  <input
    type="text"
    name="contactInfo"
    value={filters.contactInfo}
    onChange={handleInputChange}
    className="block w-full mt-1"
  />
</label>

         

        </div>


        {/* More inputs for 'beds', 'baths', 'apartmentType', 'email', 'contactInfo', etc. */}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
}
