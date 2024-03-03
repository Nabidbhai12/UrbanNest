import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/button";
import { Img } from "../components/image";
import { Input } from "../components/input";
import { List } from "../components/list";
import { Text } from "../components/text";
import Carousel from "../components/Carousel.jsx";
import { NearbyPlacesComponent } from "../components/GoogleMap.jsx";
import { ShowApartment } from "../components/GoogleMap.jsx";
import LocationShowModal from "../modals/LocationShowModal.jsx";

import LandingPageCard from "../components/LandingPageCard.jsx";
import LandingPageFooter from "../components/LandingPageFooter.jsx";
import NearbyPlacesModal from "../modals/NearbyPlacesModal.jsx";
import { useSelector } from "react-redux";

const PropertyDetailsPage = () => {
  const API_KEY =
    "bkoi_475a8f4e8b6d64df619ca67a296b8454a6b20ed5bbeeade0f50f4e65adee8e7b";
  const navigate = useNavigate();

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [owner, setOwner] = useState(null);

  const [images, setImages] = useState([]);
  const [center, setCenter] = useState(null);

  const [addedToWishList, setAddedToWishList] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
  //const [apartment, setApartment] = useState([]);

  console.log(id);

  const fetchApartment = async () => {
    try {
      //console.log("Inside fetchApartment");
      const propertyResponse = await fetch(`/api/search/property/${id}`);

      if (propertyResponse.ok) {
        const propertyInfo = await propertyResponse.json();
        console.log(propertyInfo);
        setImages(propertyInfo.images);
        setCenter({
          lat: propertyInfo.location.coordinates.coordinates[1],
          lng: propertyInfo.location.coordinates.coordinates[0],
        });
        setProperty(propertyInfo);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const imageURLs = [];

  for (var i = 0; i < images.length; i++) {
    imageURLs.push(images[i].url);
  }

  console.log(imageURLs);
  //console.log(property);

  const fetchOwnerInfo = async () => {
    try {
      const ownerInfo = await fetch(
        `/api/users/getUserDetailsByID/${property.owner}`
      );

      if (ownerInfo.ok) {
        const owner = await ownerInfo.json();
        console.log(owner);
        setOwner(owner);
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log(id);
  useEffect(() => {
    fetchApartment();
  }, [id]);

  useEffect(() => {
    fetchOwnerInfo();
    //fetchData(center, ['school']);
  }, [property]);

  //console.log(property);
  const landingPageCardPropList = [
    {},
    { image: "images/img_image_1.png" },
    { image: "images/img_image_2.png" },
  ];

  const [activeButton, setActiveButton] = useState("map");
  const [mapProps, setMapProps] = useState([]);

  const handleClickMap = (buttonName) => {
    setActiveButton(buttonName);
    setLocationShowModal(true);
    console.log(activeButton);
  };

  const handleClickNearby = (buttonName) => {
    setActiveButton(buttonName);
    setNearbyPlacesModal(true);
    console.log(activeButton);
  };

  useEffect(() => {
    setMapProps([activeButton]);
    console.log(mapProps);
  }, [activeButton]);

  console.log(center);

  const fetchNeaby_Barikoi = async () => {
    const request_link =
      "https://barikoi.xyz/v2/api/search/nearby/0.5/10?api_key= + " +
      API_KEY +
      "&longitude=" +
      center.lng +
      "&latitude=" +
      center.lat;

    try {
      console.log("Inside fnction");
      const response = await fetch(request_link, {
        method: "GET",
        headers: {},
      });
      //console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      //return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    //fetchNeaby_Barikoi();
  }, [center]);

  const [isOpenLocationShowModal, setLocationShowModal] = React.useState(false);
  const [isOpenNearbyPlacesModal, setNearbyPlacesModal] = React.useState(false);

  function handleOpenLocationShowModal() {
    setLocationShowModal(true);
  }
  function handleCloseLocationShowModal() {
    setLocationShowModal(false);
  }

  function handleOpenNearbyPlacesModal() {
    setNearbyPlacesModal(true);
  }
  function handleCloseNearbyPlacesModal() {
    setNearbyPlacesModal(false);
  }

  const handleWishList = async (property_id) => {
    if (addedToWishList) {
      try {
        const response = await fetch(
          `/api/users/removeFromWishList/${property_id}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.status === 200) {
          setAddedToWishList(false);
          alert("This property has been removed from your wishlist!");
        }
      } catch (err) {
        console.error("Error removing from wishlist: ", err);
      }
    } else {
      try {
        const response = await fetch(
          `/api/users/addToWishList/${property_id}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.status === 200) {
          setAddedToWishList(true);
          alert("This property has been added to your wishlist!");
        }
      } catch (err) {
        console.error("Error adding to wishlist:", err);
      }
    }
  };

  const handleSold = async (property_id) => {
    try{
      const response = await fetch (`/api/users/markPropertyAsSold/${property_id}`, {
        method: 'POST',
        credentials: 'include'
      });

      if(response.status === 200){
        alert("Your property has been sold!");
        navigate("/");
      }
    } catch(err){
      console.error("Error selling: ", err);
    }
  }

  const renderButton = () => {
    if(currentUser._id === property.owner){

    }
  }

  return (
    <div>
      {property && owner && images ? (
        <>
          <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
            <div className="flex flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
              <div className="flex flex-col gap-10 items-start justify-start w-full">
                <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
                  <div className="flex md:flex-col flex-row gap-6 items-center justify-center max-w-[1200px] mx-auto w-full">
                    <Carousel images={imageURLs} />
                  </div>
                </div>
                <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
                  <div className="flex md:flex-col flex-row gap-6 items-start justify-center max-w-[1200px] mx-auto w-full">
                    <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                      <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-[10px] w-full">
                        <div className="flex flex-col gap-11 items-start justify-start w-full">
                          <div className="flex flex-col gap-6 items-start justify-start w-full">
                            <div className="flex flex-col gap-4 items-start justify-start w-full">
                              <Text
                                className="leading-[135.00%] max-w-[712px] md:max-w-full sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px]"
                                size="txtManropeExtraBold28"
                              >
                                {property.title}
                              </Text>
                              <Text
                                className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                                size="txtManropeSemiBold20Gray900"
                              >
                                {property.location.address}
                              </Text>
                            </div>
                            <div className="flex sm:flex-col flex-row gap-4 items-start justify-start md:pr-10 sm:pr-5 pr-[180px] w-full">
                              <div className="bg-white-A700 border border-gray-600 border-solid flex flex-1 flex-col items-center justify-center sm:px-5 px-6 py-[7px] rounded-[10px] w-full">
                                <div className="flex flex-col gap-1 items-start justify-start w-full">
                                  <Text
                                    className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                                    size="txtManropeBold24Gray900"
                                  >
                                    {property.price.amount +
                                      " " +
                                      property.price.currency}
                                  </Text>
                                  <Text
                                    className="text-gray-600 text-xs w-full"
                                    size="txtManropeSemiBold12"
                                  >
                                    Online / Cash Payment
                                  </Text>
                                </div>
                              </div>
                              <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-1 flex-col items-center justify-center sm:px-5 px-6 py-[7px] rounded-[10px] w-full">
                                <div className="flex flex-col gap-1 items-start justify-start w-full">
                                  <Text
                                    className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                                    size="txtManropeBold24Gray900"
                                  >
                                    850 BDT / month
                                  </Text>
                                  <Text
                                    className="text-gray-600 text-xs w-full"
                                    size="txtManropeSemiBold12"
                                  >
                                    0% EMI for 6 Months
                                  </Text>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-4 items-start justify-start w-full">
                            <Text
                              className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                              size="txtManropeSemiBold20Gray900"
                            >
                              Well-constructed {property.size} Sq Ft{" "}
                              {property.apartmentType} Is Now Offering To You In{" "}
                              {property.location.area} {property.propertyStatus}
                            </Text>
                            <Text
                              className="leading-[180.00%] w-full md:max-w-full text-gray-600 text-lg"
                              size="txtManropeRegular18Gray600"
                            >
                              {property.description}
                            </Text>
                          </div>
                          <div className="flex flex-col gap-6 items-start justify-start w-full">
                            <div className="flex flex-col gap-6 items-start justify-start w-full">
                              <Text
                                className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                                size="txtManropeExtraBold28"
                              >
                                Local Information
                              </Text>
                              <div className="gap-3 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-start md:pr-10 sm:pr-5 w-full">
                                <Button
                                  onClick={() => handleClickMap("map")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "map"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Map
                                </Button>
                                <Button
                                  onClick={() => handleClickNearby("school")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "school"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Elementary Education
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleClickNearby("university")
                                  }
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "university"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Higher Education
                                </Button>
                                <Button
                                  onClick={() => handleClickNearby("hospital")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "hospital"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Hospital
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleClickNearby("restaurant")
                                  }
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "restaurant"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Restaurants
                                </Button>
                                <Button
                                  onClick={() => handleClickNearby("cafe")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "cafe"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Cafes
                                </Button>
                                <Button
                                  onClick={() => handleClickNearby("park")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "park"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Park
                                </Button>
                                <Button
                                  onClick={() => handleClickNearby("gym")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "gym"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Gym
                                </Button>
                                <Button
                                  onClick={() => handleClickNearby("store")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "store"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Shopping
                                </Button>
                                <Button
                                  onClick={() => handleClickNearby("bank")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "bank"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Bank
                                </Button>
                                <Button
                                  onClick={() => handleClickNearby("police")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "police"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Police Station
                                </Button>
                                <Button
                                  onClick={() => handleClickNearby("museum")}
                                  className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                                    activeButton === "museum"
                                      ? "bg-black text-white-A700"
                                      : "text-gray-900"
                                  } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
                                >
                                  Cultural sites
                                </Button>
                              </div>
                            </div>
                            {/*
                            <div className="h-[600px] relative w-full">
                              {activeButton === "map" ? (
                                <>
                                  <ShowApartment apartments={property} />
                                </>
                              ) : (
                                <div>
                                  <NearbyPlacesComponent
                                    center={center}
                                    type={mapProps}
                                  />
                                </div>
                              )}
                            </div>
                              */}
                          </div>
                        </div>
                      </div>
                      <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-[10px] w-full">
                        <div className="flex flex-col gap-6 items-start justify-start w-full">
                          <Text
                            className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-auto"
                            size="txtManropeExtraBold28"
                          >
                            Home Highlights
                          </Text>
                          <List
                            className="sm:flex-col flex-row md:gap-10 gap-[150px] grid md:grid-cols-1 grid-cols-2 justify-start w-full"
                            orientation="horizontal"
                          >
                            <div className="flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
                              <div className="flex flex-row gap-[55px] items-start justify-start w-full">
                                <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                                  <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                                  <Text
                                    className="flex-1 text-gray-600 text-lg w-auto"
                                    size="txtManropeRegular18Gray600"
                                  >
                                    Parking
                                  </Text>
                                </div>
                                <Text
                                  className="flex-1 text-gray-900 text-lg text-right w-auto"
                                  size="txtManropeSemiBold18"
                                >
                                  No Info
                                </Text>
                              </div>
                              <div className="flex flex-row gap-[47px] items-start justify-start w-full">
                                <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                                  <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                                  <Text
                                    className="flex-1 text-gray-600 text-lg w-auto"
                                    size="txtManropeRegular18Gray600"
                                  >
                                    Outdoor
                                  </Text>
                                </div>
                                <Text
                                  className="flex-1 text-gray-900 text-lg text-right w-auto"
                                  size="txtManropeSemiBold18"
                                >
                                  No Info
                                </Text>
                              </div>
                              <div className="flex flex-row gap-[85px] items-start justify-start w-full">
                                <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                                  <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                                  <Text
                                    className="flex-1 text-gray-600 text-lg w-auto"
                                    size="txtManropeRegular18Gray600"
                                  >
                                    A/C
                                  </Text>
                                </div>
                                <Text
                                  className="flex-1 text-gray-900 text-lg text-right w-auto"
                                  size="txtManropeSemiBold18"
                                >
                                  No Info
                                </Text>
                              </div>
                              <div className="flex flex-row gap-10 items-start justify-start w-full">
                                <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                                  <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                                  <Text
                                    className="flex-1 text-gray-600 text-lg w-auto"
                                    size="txtManropeRegular18Gray600"
                                  >
                                    Year Built
                                  </Text>
                                </div>
                                <Text
                                  className="flex-1 text-gray-900 text-lg text-right w-auto"
                                  size="txtManropeSemiBold18"
                                >
                                  2021
                                </Text>
                              </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
                              <div className="flex flex-row gap-20 items-start justify-start w-full">
                                <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                                  <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                                  <Text
                                    className="flex-1 text-gray-600 text-lg w-auto"
                                    size="txtManropeRegular18Gray600"
                                  >
                                    HOA
                                  </Text>
                                </div>
                                <Text
                                  className="flex-1 text-gray-900 text-lg text-right w-auto"
                                  size="txtManropeSemiBold18"
                                >
                                  None
                                </Text>
                              </div>
                              <div className="flex flex-row gap-8 items-start justify-start w-full">
                                <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                                  <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                                  <Text
                                    className="flex-1 text-gray-600 text-lg w-auto"
                                    size="txtManropeRegular18Gray600"
                                  >
                                    Price/Sqft
                                  </Text>
                                </div>
                                <Text
                                  className="flex-1 text-gray-900 text-lg text-right w-auto"
                                  size="txtManropeSemiBold18"
                                >
                                  $560
                                </Text>
                              </div>
                              <div className="flex flex-row gap-[66px] items-start justify-start w-full">
                                <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                                  <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                                  <Text
                                    className="flex-1 text-gray-600 text-lg w-auto"
                                    size="txtManropeRegular18Gray600"
                                  >
                                    Listed
                                  </Text>
                                </div>
                                <Text
                                  className="flex-1 text-gray-900 text-lg text-right w-auto"
                                  size="txtManropeSemiBold18"
                                >
                                  No Info
                                </Text>
                              </div>
                            </div>
                          </List>
                        </div>
                      </div>
                      <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-row items-start justify-start p-10 sm:px-5 rounded-[10px] w-full">
                        <div className="flex flex-col gap-[26px] items-start justify-start w-full">
                          <Text
                            className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                            size="txtManropeExtraBold28"
                          >
                            Owner Information
                          </Text>
                          <div className="flex flex-row gap-6 items-center justify-start w-full">
                            <Img
                              className="h-[150px] md:h-auto object-cover rounded-[10px] w-[150px]"
                              src="../../public/images/img_ellipse2695.png"
                              alt="rectangle5599"
                            />
                            <div className="flex flex-col gap-[3px] items-start justify-start w-auto">
                              <Text
                                className="text-gray-900 text-xl tracking-[-0.40px] w-auto"
                                size="txtManropeSemiBold20Gray900"
                              >
                                {owner.username}
                              </Text>
                              <div className="flex flex-row gap-3.5 items-center justify-start w-full">
                                <div className="flex flex-row gap-1 items-start justify-start w-auto">
                                  <Img
                                    className="h-4 w-4"
                                    src="../../public/images/img_star.svg"
                                    alt="star"
                                  />
                                  <Img
                                    className="h-4 w-4"
                                    src="../../public/images/img_star.svg"
                                    alt="star_One"
                                  />
                                  <Img
                                    className="h-4 w-4"
                                    src="../../public/images/img_star.svg"
                                    alt="star_Two"
                                  />
                                  <Img
                                    className="h-4 w-4"
                                    src="../../public/images/img_star.svg"
                                    alt="star_Three"
                                  />
                                  <Img
                                    className="h-4 w-4"
                                    src="../../public/images/img_star_gray_600.svg"
                                    alt="star_Four"
                                  />
                                </div>
                                <Text
                                  className="text-base text-gray-900 w-auto"
                                  size="txtManropeSemiBold16"
                                >
                                  4 review
                                </Text>
                              </div>
                              <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                                <Img
                                  className="h-5 w-5"
                                  src="../../public/images/img_mail_gray_600.svg"
                                  alt="mail"
                                />
                                <Text
                                  className="text-base text-gray-600 w-auto"
                                  size="txtManropeMedium16"
                                >
                                  {owner.email}
                                </Text>
                              </div>
                              <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                                <Img
                                  className="h-5 w-5"
                                  src="../../public/images/img_call.svg"
                                  alt="call"
                                />
                                <Text
                                  className="text-base text-gray-600 w-auto"
                                  size="txtManropeMedium16"
                                >
                                  {owner.contactNumber}
                                </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                        {currentUser._id !== property.owner ? (
                          <div className="flex flex-col">
                            <Button className="border-[3px] mt-[70px] border-black border-opacity-40 font-semibold font-manrope text-black rounded-[10px] hover:text-orange-800 hover:border-orange-800">
                              Interested? Communicate with the seller.
                            </Button>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                    {/*
                    <div className="bg-white-A700 border border-bluegray-100 border-solid flex sm:flex-1 flex-col items-start justify-start p-6 sm:px-5 rounded-[10px] w-auto sm:w-full">
                      <div className="flex flex-col gap-10 items-start justify-start w-[336px]">
                        <div className="flex flex-col gap-6 items-start justify-start w-full">
                          <Text
                            className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                            size="txtManropeExtraBold28"
                          >
                            Request for Visit
                          </Text>
                          <div className="flex flex-col gap-3 h-[440px] md:h-auto items-start justify-start w-full">
                            <Input
                              name="textfieldlarge"
                              placeholder="Full Name"
                              className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                              wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                              type="text"
                              prefix={
                                <Img
                                  className="mt-auto mb-px h-6 mr-3.5"
                                  src="../../public/images/img_user.svg"
                                  alt="user"
                                />
                              }
                            ></Input>
                            <Input
                              name="textfieldlarge_One"
                              placeholder="Email Address"
                              className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                              wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                              type="email"
                              prefix={
                                <Img
                                  className="mt-auto mb-px h-6 mr-3.5"
                                  src="../../public/images/img_mail_gray_600_24x24.svg"
                                  alt="mail"
                                />
                              }
                            ></Input>
                            <Input
                              name="textfieldlarge_Two"
                              placeholder="Phone Number"
                              className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                              wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                              type="number"
                              prefix={
                                <Img
                                  className="mt-auto mb-px h-6 mr-3.5"
                                  src="../../public/images/img_call.svg"
                                  alt="call"
                                />
                              }
                            ></Input>
                            <Input
                              name="textfieldlarge_Three"
                              placeholder="Date"
                              className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                              wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                              prefix={
                                <Img
                                  className="mt-auto mb-px h-6 mr-3.5"
                                  src="../../public/images/img_calendar.svg"
                                  alt="calendar"
                                />
                              }
                            ></Input>
                            <Input
                              name="inputbox"
                              placeholder="Message"
                              className="font-semibold md:h-auto p-0 placeholder:text-gray-600 sm:h-auto text-gray-600 text-left text-lg w-full"
                              wrapClassName="bg-white-A700 border border-bluegray-100 border-solid p-[19px] rounded-[10px] w-full"
                            ></Input>
                          </div>
                        </div>
                        <Button className="bg-gray-900 cursor-pointer font-semibold py-[17px] rounded-[10px] text-base text-center text-white-A700 w-full">
                          Send Request
                        </Button>
                      </div>
                    </div>
                            */}
                  </div>
                </div>
                
              </div>
              <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
                <div className="flex flex-col gap-10 items-center justify-center max-w-[1200px] mx-auto w-full">
                  <div className="flex sm:flex-col flex-row gap-5 items-center justify-start w-full">
                    <Button
                      className="common-pointer bg-transparent border border-black hover:border-orange-A700 px-[5px] py-[7px] rounded-[10px] cursor-pointer flex items-center justify-center min-w-[124px]"
                      onClick={() => handleWishList(property._id)}
                      rightIcon={
                        <Img
                          className="h-6 mb-[3px] ml-2"
                          src="../../public/images/img_arrowright.svg"
                          alt="arrow_right"
                        />
                      }
                    >
                      {currentUser._id !== property.owner ? (
                        <div className="font-bold text-left text-lg text-orange-A700">
                          Add to Wishlist
                        </div>
                      ) : (
                        <div className="font-bold text-left text-lg text-orange-A700">
                          Sold
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
                <div className="flex flex-col gap-10 items-center justify-center max-w-[1200px] mx-auto w-full">
                  <div className="flex sm:flex-col flex-row gap-5 items-center justify-start w-full">
                    <Text
                      className="flex-1 sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-auto"
                      size="txtManropeExtraBold28"
                    >
                      Latest Property Listings
                    </Text>
                    <Button
                      className="common-pointer bg-transparent cursor-pointer flex items-center justify-center min-w-[124px]"
                      onClick={() => navigate("/listing")}
                      rightIcon={
                        <Img
                          className="h-6 mb-[3px] ml-2"
                          src="../../public/images/img_arrowright.svg"
                          alt="arrow_right"
                        />
                      }
                    >
                      <div className="font-bold text-left text-lg text-orange-A700">
                        Explore All
                      </div>
                    </Button>
                  </div>
                  <List
                    className="sm:flex-col flex-row gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-start w-full"
                    orientation="horizontal"
                  >
                    {landingPageCardPropList.map((props, index) => (
                      <React.Fragment key={`LandingPageCard${index}`}>
                        <LandingPageCard
                          className="flex flex-1 flex-col h-full items-start justify-start w-full"
                          {...props}
                        />
                      </React.Fragment>
                    ))}
                  </List>
                </div>
              </div>
            </div>
            <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
          </div>
        </>
      ) : (
        <p>Loading property details...</p>
      )}
      {isOpenLocationShowModal ? (
        <LocationShowModal
          isOpen={isOpenLocationShowModal}
          onRequestClose={handleCloseLocationShowModal}
          apartments={[property]}
        />
      ) : null}
      {isOpenNearbyPlacesModal ? (
        <NearbyPlacesModal
          isOpen={isOpenNearbyPlacesModal}
          onRequestClose={handleCloseNearbyPlacesModal}
          center={center}
          type={mapProps}
        />
      ) : null}
    </div>
  );
};

export default PropertyDetailsPage;
