{/*
        <div className="h-[600px] relative w-full">
          {activeButton === "map" ? (
            <>
              <ShowApartment apartments={apartment} />
            </>
          ) : (
            <div>
              <NearbyPlacesComponent center={center} type={mapProps} />
            </div>
          )}
        </div>
          */}







{/*
            <Button
              onClick={() => handleClick("university")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "university"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Higher Education
            </Button>
            <Button
              onClick={() => handleClick("hospital")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "hospital"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Hospital
            </Button>
            <Button
              onClick={() => handleClick("restaurant")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "restaurant"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Restaurants
            </Button>
            <Button
              onClick={() => handleClick("cafe")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "cafe"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Cafes
            </Button>
            <Button
              onClick={() => handleClick("park")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "park"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Park
            </Button>
            <Button
              onClick={() => handleClick("gym")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "gym"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Gym
            </Button>
            <Button
              onClick={() => handleClick("store")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "store"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Shopping
            </Button>
            <Button
              onClick={() => handleClick("bank")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "bank"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Bank
            </Button>
            <Button
              onClick={() => handleClick("police")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "police"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Police Station
            </Button>
            <Button
              onClick={() => handleClick("museum")}
              className={`border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center w-full ${
                activeButton === "museum"
                  ? "bg-black text-white-A700"
                  : "text-gray-900"
              } hover:bg-black hover:text-white-A700 focus:outline-none focus:bg-black focus:text-white-A700`}
            >
              Cultural sites
            </Button>
            */}










// const [property, setProperty] = useState(null);
  // const [owner, setOwner] = useState(null);

  // const [images, setImages] = useState([]);
  // const [center, setCenter] = useState(null);

  // const [apartment, setApartment] = useState([]);

  // console.log(id);

  // const fetchApartment = async () => {
  //   try {
  //     //console.log("Inside fetchApartment");
  //     const propertyResponse = await fetch(`/api/search/property/${id}`);

  //     if (propertyResponse.ok) {
  //       const propertyInfo = await propertyResponse.json();
  //       console.log(propertyInfo);
  //       setImages(propertyInfo.images);
  //       setCenter({
  //         lat: propertyInfo.location.coordinates.coordinates[1],
  //         lng: propertyInfo.location.coordinates.coordinates[0],
  //       });
  //       setApartment([propertyInfo]);
  //       setProperty(propertyInfo);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const imageURLs = [];

  // for (var i = 0; i < images.length; i++) {
  //   imageURLs.push(images[i].url);
  // }

  // console.log(imageURLs);
  // //console.log(property);

  // const fetchOwnerInfo = async () => {
  //   try {
  //     const ownerInfo = await fetch(
  //       `/api/users/getUserDetailsByID/${property.owner}`
  //     );

  //     if (ownerInfo.ok) {
  //       const owner = await ownerInfo.json();
  //       console.log(owner);
  //       setOwner(owner);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // console.log(id);
  // useEffect(() => {
  //   fetchApartment();
  // }, [id]);

  // useEffect(() => {
  //   fetchOwnerInfo();
  // }, [property]);

  // //console.log(property);
  // const landingPageCardPropList = [
  //   {},
  //   { image: "images/img_image_1.png" },
  //   { image: "images/img_image_2.png" },
  // ];