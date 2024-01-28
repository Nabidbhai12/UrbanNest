import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageHeader from "../components/LandingPageHeader";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { CheckBox } from "../components/checkBox";
import { Img } from "../components/image";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import SearchResults from "./SearchResults";


export default function test() {
  const [filters, setFilters] = useState({
    saleType: "sell", // 'sell' or 'rent'
    propertyType: "residential", // 'commercial' or 'residential'
    condition: "new", // 'new', 'used', or 'under-construction'
    city: "",
    zip: "",
    address: "",
    areaRange_min: [0, 10000],
    areaRange_max: [0, 10000],
    priceRange_min: [0, 1000000],
    priceRange_max: [0, 1000000],
    beds: 1,
    baths: 1,
    apartmentType: "house", // 'house', 'penthouse', 'duplex', 'studio'
    email: "",
    contactInfo: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value.split(",").map(Number),
    });

    console.log("Name: " + name + " Value: " + value);
  };

  const BackButton = () => {
    const navigate = useNavigate();
  
    const goBack = () => {
      navigate(-1);
    };
  
    return (
      <button onClick={goBack} className="font-extrabold font-manrope shadow-xl transition duration-300 ease-in-out cursor-pointer  items-center justify-center px-[50px] py-[10px] bg-gray-200 text-black rounded-[30px] hover:bg-red-700 hover:text-black">
        Cancel
      </button>
    );
  };

  const renderAreaLabels = () => {
    if (filters.propertyType === "commercial") {
      return (
        <>
          <span className="text-sm text-black dark:text-gray-400 absolute start-0 -bottom-6 transition-opacity duration-300">
            0
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            3000
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            6000
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            9000
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute end-0 -bottom-6 transition-opacity duration-300">
            12000
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className="text-sm text-black dark:text-gray-400 absolute start-0 -bottom-6 transition-opacity duration-300">
            0
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            1000
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            2000
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            3000
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute end-0 -bottom-6 transition-opacity duration-300">
            4000
          </span>
        </>
      );
    }
  };

  const renderBedLabels = () => {
    if (filters.propertyType === "commercial") {
      return (
        <>
          <span className="text-sm text-black dark:text-gray-400 absolute start-0 -bottom-6 transition-opacity duration-300">
            5
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            10
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            15
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute end-0 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            20+
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className="text-sm text-black dark:text-gray-400 absolute start-0 -bottom-6 transition-opacity duration-300">
            1
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            3
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            5
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute end-0 -bottom-6 transition-opacity duration-300">
            7+
          </span>
        </>
      );
    }
  };

  const renderBathLabels = () => {
    if (filters.propertyType === "commercial") {
      return (
        <>
          <span className="text-sm text-black dark:text-gray-400 absolute start-0 -bottom-6 transition-opacity duration-300">
            2
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            4
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            6
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            8
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute end-0 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            10+
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className="text-sm text-black dark:text-gray-400 absolute start-0 -bottom-6 transition-opacity duration-300">
            1
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            2
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 transition-opacity duration-300">
            3
          </span>
          <span className="text-sm text-black dark:text-gray-400 absolute end-0 -bottom-6 transition-opacity duration-300">
            4+
          </span>
        </>
      );
    }
  };

  const changeBedToRooms = () => {
    if (filters.propertyType === "commercial") {
      return (
        <span className="bg-black text-white-A700 w-[90px] h-[30px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
          Rooms
        </span>
      );
    } else {
      return (
        <span className="bg-black text-white-A700 w-[90px] h-[30px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
          Beds
        </span>
      );
    }
  };

  const changeBathsToWashrooms = () => {
    if (filters.propertyType === "commercial") {
      return (
        <span className="bg-black text-white-A700 w-[110px] h-[30px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
          Washrooms
        </span>
      );
    } else {
      return (
        <span className="bg-black text-white-A700 w-[90px] h-[30px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
          Baths
        </span>
      );
    }
  };

  const changeBedandBathToRoomsandBaths = () => {
    if (filters.propertyType === "commercial") {
      return (
        <span className="bg-black text-white-A700 px-4 py-2 w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
          Rooms & Washrooms
        </span>
      );
    } else {
      return (
        <span className="bg-black text-white-A700 px-4 py-2 w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
          Beds & Baths
        </span>
      );
    }
  };

  const changeApartmentToProperty = () => {
    if (filters.propertyType === "commercial") {
      return (
        <span className="bg-black text-white-A700 px-4 py-2 w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
          Select Property Type
        </span>
      );
    } else {

      return (
        <span className="bg-black text-white-A700 px-4 py-2 w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
          Select Apartment Type
        </span>
      );
    }
  };
  const [searchResults, setSearchResults] = useState([]); // State to manage search results
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted filters:", filters);
  
    // Retrieve the token from local storage or cookies
  
    try {
      const response = await fetch('/api/search/property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          saleType: filters.saleType,
          propertyType: filters.propertyType,
          condition: filters.condition,
          city: filters.city,
          zip: filters.zip,
          address: filters.address,
          areaRange_min: filters.areaRange_min[0],
          areaRange_max: filters.areaRange_max[1],
          priceRange_min: filters.priceRange_min[0],
          priceRange_max: filters.priceRange_max[1],
          beds: filters.beds,
          baths: filters.baths,
          apartmentType: filters.apartmentType,
          // Add other fields as needed
        }),
       

      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Search results:", data);
      setSearchResults(data); // Set the search results in the state
      navigate('/search-results', { state: { listings: data } }); // Pass searchResults as state      // Handle the search results as needed
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  

  return (
    <div className="bg-yellow-50 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-full sm:w-full md:w-full">
      <div className="flex flex-col items-center justify-start w-full py-[50px]">
        <div className="bg-gradient-to-br from-white-A700 to-yellow-50 flex flex-col font-manrope items-center justify-start md:pl-10 sm:pl-5 px-[120px] py-[50px] w-3/4 h-3/4 overflow-hidden rounded-lg shadow-lg">
          <div className="bg-white-A700 flex flex-col items-center justify-start overflow-hidden pb-[100px] rounded-lg shadow-lg w-[1050px] h-[350px]">
            <Img
              className="scale-100 w-full h-auto rounded-lg shadow-md"
              src="images/img_search_page_image.jpg"
              alt="Description"
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 pt-[50px]">
            <div className="flex flex-col space-y-[45px] font-markoone pl-[100px]">
              <div className="flex sm:flex-col flex-row gap-[135px] items-start justify-start w-full">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                      name="saleType"
                      value="sell"
                      checked={filters.saleType === "sell"}
                      onChange={handleInputChange}
                    />
                    <span
                      className={`rounded-full px-4 py-2 text-lg ${
                        filters.saleType === "sell"
                          ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                          : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                      } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                    >
                      Buy
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                      name="saleType"
                      value="rent"
                      checked={filters.saleType === "rent"}
                      onChange={handleInputChange}
                    />
                    <span
                      className={`rounded-full px-4 py-2 text-lg ${
                        filters.saleType === "rent"
                          ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                          : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                      } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                    >
                      Rent
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex sm:flex-col flex-row gap-24 items-start justify-start w-full">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                      name="propertyType"
                      value="commercial"
                      checked={filters.propertyType === "commercial"}
                      onChange={handleInputChange}
                    />
                    <span
                      className={`rounded-full px-4 py-2 text-lg ${
                        filters.propertyType === "commercial"
                          ? "bg-black text-white-A700 px-[130px] rounded-[10px]"
                          : "bg-gray-200 text-black px-[130px] rounded-[10px]"
                      } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                    >
                      Commercial
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="propertyType"
                      className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                      value="residential"
                      checked={filters.propertyType === "residential"}
                      onChange={handleInputChange}
                    />
                    <span
                      className={`rounded-full px-4 py-2 text-lg ${
                        filters.propertyType === "residential"
                          ? "bg-black text-white-A700 px-[130px] rounded-[10px]"
                          : "bg-gray-200 text-black px-[130px] rounded-[10px]"
                      } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                    >
                      Residential
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex sm:flex-col flex-row gap-16 items-start justify-start w-full">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                      name="condition"
                      value="new"
                      checked={filters.condition === "new"}
                      onChange={handleInputChange}
                    />
                    <span
                      className={`rounded-full px-4 py-2 text-lg ${
                        filters.condition === "new"
                          ? "bg-black text-white-A700 px-[120px] rounded-[10px]"
                          : "bg-gray-200 text-black px-[120px] rounded-[10px]"
                      } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                    >
                      New
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                      name="condition"
                      value="used"
                      checked={filters.condition === "used"}
                      onChange={handleInputChange}
                    />
                    <span
                      className={`rounded-full px-4 py-2 text-lg ${
                        filters.condition === "used"
                          ? "bg-black text-white-A700 px-[120px] rounded-[10px]"
                          : "bg-gray-200 text-black px-[120px] rounded-[10px]"
                      } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                    >
                      Used
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                      name="condition"
                      value="under_construction"
                      checked={filters.condition === "under_construction"}
                      onChange={handleInputChange}
                    />
                    <span
                      className={`rounded-full px-4 py-2 text-lg ${
                        filters.condition === "under_construction"
                          ? "bg-black text-white-A700 px-[57px] rounded-[10px]"
                          : "bg-gray-200 text-black px-[57px] rounded-[10px]"
                      } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                    >
                      Under Construction
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-row">
                <div className="flex flex-row space-y-[1px] gap-[40px] pt-[50px] pr-[40px] font-markoone w-1/2">
                  <span className="bg-black text-white-A700 px-4 py-2 w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                    Select City
                  </span>
                  <select
                    name="city"
                    value={filters.city}
                    onChange={handleInputChange}
                    className="block w-full mt-1 font-extrabold font-manrope rounded-[50px]"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Sylhet">Sylhet</option>
                  </select>
                </div>

                <div className="flex flex-row space-y-[1px] gap-[40px] pt-[50px] font-markoone w-1/2">
                  <span className="bg-black text-white-A700 px-4 py-2 w-[150px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                    Zip
                  </span>
                  <input
                    type="text"
                    name="zip"
                    value={filters.zip}
                    onChange={handleInputChange}
                    className="block w-full mt-1 rounded-[50px] font-extrabold font-manrope"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3 pt-[50px] font-markoone">
                  <span className="bg-black text-white-A700 px-4 py-2 w-[150px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                    Address
                  </span>
                  <input
                    type="text"
                    name="address"
                    value={filters.address}
                    onChange={handleInputChange}
                    className="block w-full mt-1 rounded-[50px] font-extrabold font-manrope"
                    placeholder="Enter Address, Location or Neighbourhood"
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col space-y-[1px] pt-[50px] font-markoone">
                <span className="bg-black text-white-A700 px-4 py-2 w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                  Area (sqft)
                </span>

                <div className="relative flex flex-col">
                  <div className="relative mb-6 flex flex-row gap-[30px] pr-[20px] items-center justify-center w-full">
                    <span className="bg-black text-white-A700 w-[90px] h-[30px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                      Min
                    </span>
                    <div className="flex-grow relative mb-6 pt-[20px]">
                      <input
                        type="range"
                        id="steps-range"
                        name="areaRange_min"
                        value={filters.areaRange_min.join(",")}
                        min={filters.propertyType === "commercial" ? 2000 : 500}
                        max={
                          filters.propertyType === "commercial" ? 12000 : 4500
                        }
                        step={filters.propertyType === "commercial" ? 500 : 50}
                        onChange={handleRangeChange}
                        className="block w-full mt-1 accent-black cursor-pointer"
                      />
                      {renderAreaLabels()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-row gap-[30px] pr-[20px] items-center justify-center w-full">
                    <span className="bg-black text-white-A700 w-[90px] h-[30px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                      Max
                    </span>
                    <div className="flex-grow relative mb-6 pt-[20px]">
                      <input
                        type="range"
                        id="steps-range"
                        name="areaRange_max"
                        value={filters.areaRange_max.join(",")}
                        min={filters.propertyType === "commercial" ? 2000 : 500}
                        max={
                          filters.propertyType === "commercial" ? 12000 : 4000
                        }
                        step={filters.propertyType === "commercial" ? 500 : 50}
                        onChange={handleRangeChange}
                        className="block w-full mt-1 accent-black cursor-pointer"
                      />
                      {renderAreaLabels()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-[1px] pt-[50px] font-markoone">
                <span className="bg-black text-white-A700 px-4 py-2 w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                  Price
                </span>

                <div className="relative flex flex-col">
                  <div className="relative mb-6 flex flex-row gap-[30px] pr-[20px] items-center justify-center w-full">
                    <span className="bg-black text-white-A700 w-[90px] h-[30px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                      Min
                    </span>
                    <div className="flex-grow relative mb-6 pt-[20px]">
                      <input
                        type="range"
                        id="steps-range"
                        name="priceRange_min"
                        value={filters.priceRange_min.join(",")}
                        min={filters.propertyType === "commercial" ? 2000 : 500}
                        max={
                          filters.propertyType === "commercial" ? 12000 : 4000
                        }
                        step={filters.propertyType === "commercial" ? 500 : 50}
                        onChange={handleRangeChange}
                        className="block w-full mt-1 accent-black cursor-pointer"
                      />
                      {renderAreaLabels()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-row gap-[30px] pr-[20px] items-center justify-center w-full">
                    <span className="bg-black text-white-A700 w-[90px] h-[30px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                      Max
                    </span>
                    <div className="flex-grow relative mb-6 pt-[20px]">
                      <input
                        type="range"
                        id="steps-range"
                        name="priceRange_max"
                        value={filters.priceRange_max.join(",")}
                        min={filters.propertyType === "commercial" ? 2000 : 500}
                        max={
                          filters.propertyType === "commercial" ? 12000 : 4000
                        }
                        step={filters.propertyType === "commercial" ? 500 : 50}
                        onChange={handleRangeChange}
                        className="block w-full mt-1 accent-black cursor-pointer"
                      />
                      {renderAreaLabels()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-[1px] pt-[50px] font-markoone">
                {changeBedandBathToRoomsandBaths()}

                <div className="relative flex flex-col">
                  <div className="relative mb-6 flex flex-row gap-[30px] pr-[20px] items-center justify-center w-full">
                    {changeBedToRooms()}
                    <div className="flex-grow relative mb-6 pt-[20px]">
                      <input
                        type="range"
                        id="steps-range"
                        name="beds"
                        value={filters.beds}
                        min={filters.propertyType === "commercial" ? 5 : 1}
                        max={filters.propertyType === "commercial" ? 20 : 7}
                        step={filters.propertyType === "commercial" ? 1 : 1}
                        onChange={handleRangeChange}
                        className="block w-full mt-1 accent-black cursor-pointer"
                      />
                      {renderBedLabels()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-row gap-[30px] pr-[20px] items-center justify-center w-full">
                    {changeBathsToWashrooms()}
                    <div className="flex-grow relative mb-6 pt-[20px]">
                      <input
                        type="range"
                        id="steps-range"
                        name="baths"
                        value={filters.baths}
                        min={filters.propertyType === "commercial" ? 2 : 1}
                        max={filters.propertyType === "commercial" ? 10 : 4}
                        step={filters.propertyType === "commercial" ? 1 : 1}
                        onChange={handleRangeChange}
                        className="block w-full mt-1 accent-black cursor-pointer"
                      />
                      {renderBathLabels()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-[1px] gap-[20px] pt-[50px] font-markoone">
                {changeApartmentToProperty()}

                <div className="flex sm:flex-col flex-row gap-[135px] items-start justify-start w-full">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                        name="apartmentType"
                        value="House"
                        checked={filters.apartmentType === "House"}
                        onChange={handleInputChange}
                      />
                      <span
                        className={`rounded-full px-4 py-2 text-lg ${
                          filters.apartmentType === "House"
                            ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                            : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                        } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                      >
                        House
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                        name="apartmentType"
                        value="Penthouse"
                        checked={filters.apartmentType === "Penthouse"}
                        onChange={handleInputChange}
                      />
                      <span
                        className={`rounded-full px-4 py-2 text-lg ${
                          filters.apartmentType === "Penthouse"
                            ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                            : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                        } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                      >
                        Penthouse
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex sm:flex-col flex-row gap-[135px] items-start justify-start w-full">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                        name="apartmentType"
                        value="Duplex"
                        checked={filters.apartmentType === "Duplex"}
                        onChange={handleInputChange}
                      />
                      <span
                        className={`rounded-full px-4 py-2 text-lg ${
                          filters.apartmentType === "Duplex"
                            ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                            : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                        } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                      >
                        Duplex
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                        name="apartmentType"
                        value="Studio"
                        checked={filters.apartmentType === "Studio"}
                        onChange={handleInputChange}
                      />
                      <span
                        className={`rounded-full px-4 py-2 text-lg ${
                          filters.apartmentType === "Studio"
                            ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                            : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                        } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                      >
                        Studio
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-[30px] w-full items-center justify-center pt-[30px]">
              <button
                type="submit"
                className="font-extrabold font-manrope shadow-xl transition duration-300 ease-in-out cursor-pointer  items-center justify-center px-[50px] py-[10px] bg-gray-200 text-black rounded-[30px] hover:bg-black hover:text-white-A700"
              >
                Apply
              </button>
              <BackButton />
            </div>
          </form>
        </div>
      </div>
      <Routes>
        <Route path="/search-results" element={<SearchResults listings={searchResults} />} />
      </Routes>
    </div>
  );
}
