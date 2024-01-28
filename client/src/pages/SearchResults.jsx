import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Ensure react-icons is installed

const SearchResults = () => {
  const location = useLocation(); // Access location
  const allListings = location.state?.listings; // Access listings from state
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 4;
  const totalPages = Math.ceil(allListings?.length / listingsPerPage);

  // Calculate the currently displayed listings
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = allListings?.slice(indexOfFirstListing, indexOfLastListing);

  // Pagination Pages
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (!allListings || allListings.length === 0) {
    return <div className="text-center py-12">No Listings Found</div>;
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Real Estate & Homes For Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentListings.map((listing, index) => (
            <div key={index} className="listing bg-white shadow-lg p-4 rounded-lg relative">
              <div className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer">
                <FaHeart size={24} />
              </div>
              {/* Access the url property of the first image */}
              {listing.images && listing.images.length > 0 ? (
                <img src={listing.images[0].url} alt={listing.images[0].caption || 'Property'} className="w-full h-48 rounded-lg object-cover mb-4" />
              ) : (
                <div className="w-full h-48 rounded-lg object-cover mb-4 bg-gray-200 flex items-center justify-center">
                  Image not available
                </div>
              )}
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{listing.title}</h3>
                {listing.price && (
                  <p className="text-lg font-bold text-gray-800 mb-2">
                    {listing.price.currency} {listing.price.amount.toLocaleString()}
                  </p>
                )}
                {/* Conditional rendering for room details */}
                {listing.rooms ? (
                  <p className="text-sm text-gray-600">
                    {listing.rooms.bedrooms && `${listing.rooms.bedrooms} bds | `}
                    {listing.rooms.bathrooms && `${listing.rooms.bathrooms} ba | `}
                    {listing.size && `${listing.size} sqft`}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">Room details not available</p>
                )}
                {listing.location && (
                  <p className="text-sm text-gray-600">
                    {listing.location.address}, {listing.location.city}, {listing.location.state}, {listing.location.zipCode}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {pageNumbers.map(number => (
            <button
              key={number}
              className={`mx-1 px-4 py-2 ${currentPage === number ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;


