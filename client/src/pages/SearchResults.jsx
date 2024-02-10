import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Ensure react-icons is installed
import { Button } from "../components/button.jsx";
import { Img } from "../components/image.jsx";
import { Text } from "../components/text.jsx";

import LandingPageCard from "../components/LandingPageCard.jsx";
import LandingPageFooter from "../components/LandingPageFooter.jsx";

const SearchResults = () => {
  const landingPageCardPropList = [
    {},
    { image: "images/img_image_1.png" },
    { image: "images/img_image_1.png" },
    { image: "images/img_image_3.png" },
    { image: "images/img_image_4.png" },
    { image: "images/img_image_4.png" },
    { image: "images/img_image_5.png" },
    { image: "images/img_image_2.png" },
    { image: "images/img_image_2.png" },
  ];
  const location = useLocation(); // Access location
  const allListings = location.state?.listings; // Access listings from state
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 4;
  const totalPages = Math.ceil(allListings?.length / listingsPerPage);

  // Calculate the currently displayed listings
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = allListings?.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  // Pagination Pages
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (!allListings || allListings.length === 0) {
    return <div className="text-center py-12">No Listings Found</div>;
  }

  return (
    <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
      <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-start max-w-[1200px] mx-auto w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="md:gap-5 gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
            {landingPageCardPropList.map((props, index) => (
              <React.Fragment key={`LandingPageCard${index}`}>
                <LandingPageCard
                  className="flex flex-1 flex-col h-[512px] md:h-auto items-start justify-start w-full"
                  {...props}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
          <div className="flex flex-row gap-[5px] items-start justify-start w-auto">
            <Button className="border border-gray-700 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
              1
            </Button>
            <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
              2
            </Button>
            <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
              3
            </Button>
            <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
              4
            </Button>
            <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
              5
            </Button>
          </div>
          <Button
            className="border border-bluegray-102 border-solid cursor-pointer flex items-center justify-center min-w-[134px] px-[17px] py-[13px] rounded-[10px]"
            rightIcon={
              <Img
                className="h-4 mt-px mb-[5px] ml-1"
                src="images/img_arrowright_gray_900.svg"
                alt="arrow_right"
              />
            }
          >
            <div className="font-semibold text-base text-gray-900 text-left">
              Next Page
            </div>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Real Estate & Homes For Sale
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentListings.map((listing, index) => (
            <div
              key={index}
              className="listing bg-white shadow-lg p-4 rounded-lg relative"
            >
              <div className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer">
                <FaHeart size={24} />
              </div>
              {/* Access the url property of the first image */}
              {listing.images && listing.images.length > 0 ? (
                <img
                  src={listing.images[0].url}
                  alt={listing.images[0].caption || "Property"}
                  className="w-full h-48 rounded-lg object-cover mb-4"
                />
              ) : (
                <div className="w-full h-48 rounded-lg object-cover mb-4 bg-gray-200 flex items-center justify-center">
                  Image not available
                </div>
              )}
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {listing.title}
                </h3>
                {listing.price && (
                  <p className="text-lg font-bold text-gray-800 mb-2">
                    {listing.price.currency}{" "}
                    {listing.price.amount.toLocaleString()}
                  </p>
                )}
                {/* Conditional rendering for room details */}
                {listing.rooms ? (
                  <p className="text-sm text-gray-600">
                    {listing.rooms.bedrooms &&
                      `${listing.rooms.bedrooms} bds | `}
                    {listing.rooms.bathrooms &&
                      `${listing.rooms.bathrooms} ba | `}
                    {listing.size && `${listing.size} sqft`}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Room details not available
                  </p>
                )}
                {listing.location && (
                  <p className="text-sm text-gray-600">
                    {listing.location.address}, {listing.location.city},{" "}
                    {listing.location.state}, {listing.location.zipCode}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`mx-1 px-4 py-2 ${
                currentPage === number ? "bg-blue-600" : "bg-blue-500"
              } text-white rounded`}
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
