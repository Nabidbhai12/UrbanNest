import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

let districts = [];
const parseCsv = (csvContent) => {
  const lines = csvContent.split('\n');
  const result = [];

  lines.forEach((line) => {
    const columns = line.split(',');
    if (columns.length > 2) { // Ensure the column exists
      let district = columns[2].trim(); // Assuming the third column contains the districts
      district = district.replace(/^"|"$/g, '');
      result.push(district);
    }
  });

  return result;
};

const loadCsvFile = async () => {
  try {
    const response = await fetch('assets/districts.csv'); // Update the path to your CSV file
    const csvText = await response.text();
    districts = parseCsv(csvText);
    console.log(districts); // Array of districts
  } catch (error) {
    console.error('Error loading or parsing CSV:', error);
  }
};

// Call this function when you enter the page or when you want to load the CSV file
loadCsvFile();


const Selector = ({ onCitySelect }) => {
  // Array of district cities of Bangladesh
  const districtCities = districts;

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
    <div className="w-[350px] font-extrabold font-manrope pt-[7px]">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white-A700 w-full px-2 py-[12px] flex items-center justify-between rounded-[10px] border border-black border-opacity-30 ${
          !selected && "text-black opacity-60"
        }`}
      >
        {selected || "Select District"}
        <BiChevronDown size={20} className={`${open && "rotate-180 transition-transform duration-100"}`} />
      </div>
      <ul
        className={`bg-white-A700 mt-2 overflow-y-auto transition-max-height duration-300 ease-in-out ${
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
              } transition-all duration-100`}
              onClick={() => {
                handleCitySelection(city);
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

