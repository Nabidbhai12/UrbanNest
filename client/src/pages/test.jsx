// import React, { useState } from 'react';

// const SearchBar = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [filters, setFilters] = useState([]);

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleAddFilter = () => {
//     if (inputValue.trim() && !filters.includes(inputValue.trim())) {
//       setFilters([...filters, inputValue.trim()]);
//       setInputValue('');
//     }
//   };

//   const handleRemoveFilter = (filter) => {
//     setFilters(filters.filter((f) => f !== filter));
//   };

//   return (
//     <div className="flex flex-col p-4">
//       <div className="flex items-center border-2 rounded">
//         <input
//           type="text"
//           placeholder="Enter your address"
//           value={inputValue}
//           onChange={handleInputChange}
//           className="p-2 outline-none flex-grow"
//         />
//         <button onClick={handleAddFilter} className="p-2">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             {/* Icon from Heroicons */}
//           </svg>
//         </button>
//       </div>
//       <div className="flex flex-wrap mt-2">
//         {filters.map((filter, index) => (
//           <div key={index} className="flex items-center m-1 bg-gray-200 rounded">
//             <span className="p-2">{filter}</span>
//             <button onClick={() => handleRemoveFilter(filter)} className="p-2">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {/* X icon from Heroicons */}
//               </svg>
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import React from "react";
import { useState } from "react";
import { Button } from "../components/button.jsx";
import { GoogleMap } from "../components/GoogleMap.jsx";
import { Img } from "../components/image.jsx";
import { Input } from "../components/input.jsx";
import { List } from "../components/list.jsx";
import { SelectBox } from "../components/SelectBox.jsx";
import { Text } from "../components/text.jsx";
import Select from "react-select";
import Selector from "../components/selector.jsx";
import Dropdown_buy_rent from "../components/dropdown_rent.jsx";
import Dropdown_apartment from "../components/dropdown_apartments.jsx";
import Dropdown_beds_baths from "../components/dropdown_beds_baths.jsx";
import Dropdown_price from "../components/dropdown_price.jsx";
import Dropdown_area from "../components/dropdown_area.jsx";

import LandingPageCard from "../components/LandingPageCard.jsx";
import LandingPageFooter from "../components/LandingPageFooter.jsx";

const dropdownlargeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const priceOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const dropdownlargeOneOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const ListingMapViewPage = () => {
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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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

  const handleCitySelection = (selectedCity) => {
    setFilters({
      ...filters,
      city: selectedCity,
    });
  };

  const handlePropertyType = (selectedType) => {
    setFilters({
      ...filters,
      propertyType: selectedType,
    });
  };

  const handleApartmentType = (selectedApartment) => {
    setFilters({
      ...filters,
      apartmentType: selectedApartment,
    });
  };

  const handlePriceChange = (min_price, max_price) => {
    setFilters({
      ...filters,
      priceRange_min: min_price,
      priceRange_max: max_price,
    });
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value.split(",").map(Number),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted filters:", filters);

    // Retrieve the token from local storage or cookies

    try {
      const response = await fetch("/api/search/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
      navigate("/search-results", { state: { listings: data } }); // Pass searchResults as state      // Handle the search results as needed
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-center w-full">
          <div className="flex flex-col font-manrope items-center justify-start md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col gap-6 items-center justify-center max-w-[1200px] mx-auto w-full">
              <Text
                className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
                size="txtManropeExtraBold36"
              >
                Find Property
              </Text>
              <div className="flex flex-row gap-[50px] items-start justify-start w-full">
                <div className="flex flex-row gap-5 items-start justify-start w-auto">
                  <div className="flex sm:flex-1 flex-col items-start justify-start w-auto sm:w-full">
                    <Selector onCitySelect={handleCitySelection} />
                  </div>
                </div>
                <div className="flex flex-row px-3 py-[10px]">
                  <Dropdown_buy_rent />
                </div>
                <div className="flex flex-row px-3 py-[10px]">
                  <Dropdown_apartment
                    onTypeSelect={handlePropertyType}
                    onClassSelect={handleApartmentType}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-[50px] items-start justify-start w-full">
                <div className="flex flex-row gap-5 items-start justify-start w-auto">
                  <div className="flex flex-row py-[10px]">
                    <Dropdown_beds_baths propertyType={filters.propertyType} />
                  </div>
                  <div className="flex flex-row py-[10px]">
                    <Dropdown_price onPriceSelect={handlePriceChange} />
                  </div>
                  <div className="flex flex-row py-[10px]">
                    <Dropdown_area />
                  </div>
                  <div className="flex flex-row py-[10px]">
                    <Button
                      className="bg-gray-900 cursor-pointer flex items-center justify-center min-w-[124px] px-4 py-[8px] rounded-[10px]"
                      rightIcon={
                        <Img
                          className="h-5 mt-px mb-[3px] ml-2.5"
                          src="images/img_search_white_a700.svg"
                          alt="search"
                        />
                      }
                    >
                      <div className="font-bold text-left text-lg text-white-A700">
                        Search
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default ListingMapViewPage;
