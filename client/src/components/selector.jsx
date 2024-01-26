import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Selector = ({ onCitySelect }) => {
  // Array of district cities of Bangladesh
  const districtCities = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Sylhet",
    "Rajshahi",
    "Barishal",
    "Rangpur",
    "Mymensingh",
    // Add more districts if necessary
  ];

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const handleCitySelection = (city) => {
    setSelected(city);
    setOpen(false);
    setInputValue("");
    onCitySelect(city); // Call the callback function passed as a prop
  };

  return (
    <div className="w-72 font-extrabold font-manrope pt-[7px]">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-gray-200 w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-black"
        }`}
      >
        {selected || "Select District"}
        <BiChevronDown size={20} className={`${open && "rotate-180 transition-transform duration-100"}`} />
      </div>
      <ul
        className={`bg-white-A700 mt-2 overflow-y-auto transition-max-height duration-700 ease-in-out ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white-A700">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter district name"
            className="placeholder:text-gray-700 p-2 outline-none w-full"
          />
        </div>
        {districtCities
          .filter((city) => city.toLowerCase().startsWith(inputValue))
          .map((city) => (
            <li
              key={city}
              className={`p-2 text-sm hover:bg-black hover:text-white-A700 ${
                city.toLowerCase() === selected.toLowerCase() && "bg-black text-white-A700"
              } transition-all duration-300`}
              onClick={() => {
                //handleCitySelection(city);
                setSelected(city);
                setOpen(false);
                setInputValue("");
              }}
            >
              {city}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Selector;

