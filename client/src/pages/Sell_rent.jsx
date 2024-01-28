import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageHeader from "../components/LandingPageHeader";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { CheckBox } from "../components/checkBox";
import { Img } from "../components/image";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function test() {
  const { currentUser } = useSelector((state) => state.user);

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
    email: currentUser.email,
    images: [],
    contactInfo: "",
    parking: false,
    pets: false,
    gym: false,
    mosque: false,
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [sentImages, setSentImages] = useState([]);

  const handleMultipleFileChange = (event) => {
    setSelectedImages(event.target.files[0]);

    console.log("Test: " + event.target.files[0]);
    console.log("Profile picture: " + profilePicture);
    console.log(selectedImages.length);
    if (warning) setWarning('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name + " " + value + " " + type + " " + checked);
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
    console.log("Parking: " + filters.parking);
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
      <button
        onClick={goBack}
        className="font-extrabold font-manrope shadow-xl transition duration-300 ease-in-out cursor-pointer  items-center justify-center px-[50px] py-[10px] bg-gray-200 text-black rounded-[30px] hover:bg-red-700 hover:text-black"
      >
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

  const ImageUploader = () => {
    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;

      const sentImages = event.target.files;
      let formData = new FormData();
      for (let i = 0; i < sentImages.length; i++) {
        formData.append("images", sentImages[i]);
      }


      //filters.images.append(selectedFiles);

      console.log(
        "Selected files: " + selectedFiles[0] + "Size: " + selectedFiles.length
      );

      //console.log("Images filters size: " + filters.images.length);
      const selectedFilesArray = Array.from(selectedFiles);
      const sentImagesArray = Array.from(sentImages);

      setSentImages(prevImages => [...prevImages, ... sentImagesArray]);

      console.log("Selected files array: " + selectedFilesArray);

      //setSelectedImages(prevImages => [...prevImages, ...selectedFilesArray]);

      console.log("SentImages size: " + sentImages.length);

      //console.log("Images length" + filters.images.length);

      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });

      setSelectedImages((previousImages) => previousImages.concat(imagesArray));

      // FOR BUG IN CHROME
      event.target.value = "";
    };

    function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    }

    return (
      <div className="py-8 px-8">
        <label
          className={`m-auto font-extrabold font-manrope flex flex-col items-center bg-white-A700 text-black justify-center border-dotted border-1 border-black rounded-2xl w-40 h-40 cursor-pointer text-lg ${
            selectedImages.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          + Add Images
          <br />
          <span className="font-light text-sm pt-2">up to 5 images</span>
          <input
            type="file"
            name="images"
            className="hidden"
            onChange={onSelectFile}
            multiple
            accept="image/png , image/jpeg, image/webp"
            disabled={selectedImages.length >= 5}
          />
        </label>
        <br />

        <input type="file" className="hidden" multiple />

        {selectedImages.length > 0 &&
          (selectedImages.length >= 6 ? (
            <p className="text-center"></p>
          ) : (
            <button
              className="cursor-pointer font-manrope font-extrabold block mx-auto border-none rounded-full w-40 h-12 bg-white-A700 text-black hover:bg-black hover:text-white-A700 hover:transition duration-200"
              onClick={() => {
                console.log("Images: " + selectedImages);
              }}
            >
              UPLOAD {selectedImages.length} IMAGE
              {selectedImages.length === 1 ? "" : "S"}
            </button>
          ))}

        <div className="flex flex-row gap-[15px] flex-wrap justify-center items-center">
          {selectedImages &&
            selectedImages.map((image, index) => (
              <div key={image} className="m-4 mx-2 relative shadow-md">
                <img src={image} alt="upload" className="w-auto h-48" />
                <button
                  onClick={() => deleteHandler(image)}
                  className="absolute bottom-0 right-0 p-2 opacity-0 hover:opacity-100 bg-deep_orange-400 text-white hover:bg-red-600 transition duration-200 font-extrabold font-manrope rounded-[20px]"
                >
                  Delete Image
                </button>
                <p className="p-2">{index + 1}</p>
              </div>
            ))}
        </div>
      </div>
    );
  };
  const navigate = useNavigate(); // Create an instance of useNavigate
  const handleSubmit_sell_rent = async (e) => {

    e.preventDefault();
    const formData = new FormData();
  
    // Append filters data to formData
    for (const key in filters) {
      if (key !== "images") {
        if (Array.isArray(filters[key])) {
          filters[key].forEach((value, index) =>
            formData.append(`${key}[${index}]`, value)
          );
        } else {
          formData.append(key, filters[key]);
        }
      }
    }
  
    // Append images to formData
    if (filters.images && filters.images.length > 0) {
      filters.images.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }
  
    try {
      const response = await fetch('/api/users/addPropertyForSale', {
        method: 'POST',
        body: formData, // send the FormData
        // Note: When using FormData with fetch, do NOT set Content-Type header
        // The browser will set it automatically including the boundary parameter
      });
  
      const data = await response.json(); // Parse JSON data from the response
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
  
      alert("Your property has been added successfully!");
      navigate("/"); // Ensure navigate is correctly defined
      console.log("Response:", data);
    } catch (error) {
      console.error("Error uploading property data and images:", error);
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
          <form
            onSubmit={handleSubmit_sell_rent}
            className="space-y-4 pt-[50px]"
            method="POST"
            encType="multipart/form-data"
          >
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
                      Sell
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

              <div className="flex flex-row space-y-[1px] gap-[40px] pt-[10px] font-markoone w-1/2">
                <span className="bg-black text-white-A700 px-4 py-2 w-[150px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                  Email
                </span>
                <input
                  type="text"
                  name="email"
                  value={filters.email}
                  onChange={handleInputChange}
                  placeholder={currentUser.email}
                  className="block w-full mt-1 rounded-[50px] font-extrabold font-manrope"
                />
              </div>

              <div className="flex flex-row space-y-[1px] gap-[40px] pt-[10px] font-markoone w-1/2">
                <span className="bg-black text-white-A700 px-[40px] py-2 w-[150px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                  Contact Information
                </span>
                <input
                  type="text"
                  name="contactInfo"
                  value={filters.contactInfo}
                  onChange={handleInputChange}
                  className="block w-full mt-1 rounded-[50px] font-extrabold font-manrope"
                />
              </div>

              <div className="flex flex-col space-y-[1px] gap-[40px] pt-[10px] font-markoone w-full">
                <span className="bg-black text-white-A700 px-4 py-2 w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                  Upload Pictures
                </span>
                <div className="flex flex-col bg-red-100 w-full h-auto rounded-[30px]">
                  <ImageUploader />
                </div>
              </div>

              <div className="flex flex-col space-y-[1px] gap-[20px] pt-[50px] font-markoone">
                <span className="bg-black text-white-A700 px-4 py-2 w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope">
                  Select Perks
                </span>

                <div className="flex sm:flex-col flex-row gap-[135px] items-start justify-start w-full">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                        name="parking"
                        value={!filters.parking}
                        checked={filters.parking === true}
                        onChange={handleInputChange}
                      />
                      <span
                        className={`rounded-full px-4 py-2 text-lg ${
                          filters.parking === true
                            ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                            : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                        } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                      >
                        Parking
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                        name="pets"
                        value={!filters.pets}
                        checked={filters.parking === true}
                        onChange={handleInputChange}
                      />
                      <span
                        className={`rounded-full px-4 py-2 text-lg ${
                          filters.pets === true
                            ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                            : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                        } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                      >
                        Pets
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex sm:flex-col flex-row gap-[135px] items-start justify-start w-full">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                        name="gym"
                        value={filters.gym}
                        checked={filters.gym === true}
                        onChange={handleInputChange}
                      />
                      <span
                        className={`rounded-full px-4 py-2 text-lg ${
                          filters.gym === true
                            ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                            : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                        } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                      >
                        Gym
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="h-2 w-2 checked:bg-black p-3 my-4 checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus-within:outline-none focus:ring-1 focus:ring-black"
                        name="mosque"
                        value={filters.mosque}
                        checked={filters.mosque === true}
                        onChange={handleInputChange}
                      />
                      <span
                        className={`rounded-full px-4 py-2 text-lg ${
                          filters.mosque === true
                            ? "bg-black text-white-A700 px-[150px] rounded-[10px]"
                            : "bg-gray-200 text-black px-[150px] rounded-[10px]"
                        } hover:bg-black hover:text-white-A700 shadow-xl cursor-pointer transition duration-300 ease-in-out font-extrabold font-manrope`}
                      >
                        Mosque
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
    </div>
  );
}
