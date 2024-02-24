import React, { useCallback, useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  LoadScript,
} from "@react-google-maps/api";

const API_KEY = "AIzaSyC2qBiJzOitO345ed0T-BAVgnM0XRnOH8g";

/*Functionality 1: 
                    a) Upon click, get the latitude and longitude of that location
                    b) After receiving that latitude and longitude, get the address of that location

Status: Working
*/

function MapClickHandler({ latitude, longitude, zoom, onLocationSelect }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY, // Replace with your actual API key
    libraries: ["places"],
  });

  const center = { lat: latitude, lng: longitude };

  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  var lat = null,
    lng = null;

  const [markerPosition, setMarkerPosition] = useState(null);

  const mapClickHandler = useCallback(
    (e) => {
      lat = e.latLng.lat();
      lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });

      console.log(`Latitude: ${lat}, Longitude: ${lng}`);

      // Assuming google.maps.Geocoder is available
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          const addressComponents = results[0].address_components;
          const postalCodeComponent = addressComponents.find(component => component.types.includes("postal_code"));
          const postalCode = postalCodeComponent ? postalCodeComponent.long_name : 'Postal code not available';
          console.log("Address:", results[0].formatted_address);
          console.log(postalCode);
          onLocationSelect(lat, lng, address, postalCode);
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    },
    [onLocationSelect]
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerClassName="w-full h-[700px]"
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={mapClickHandler}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
}


/*
Functionality 2: 
                  a) Upon searching for results, the map will show all the search result apartments on the map with markers.
                  b) Upon clicking on a marker, a brief description of the apartment will be shown, preferably using cards

Status: Working, but need to implement AdvancedMarker because Marker is deprecated, if we have time
*/

function ShowApartments({apartments}) {
  const center = {lat : apartments[0].latitude, lng : apartments[0].longitude}

  console.log(center);
  
  return (
    <LoadScript googleMapsApiKey="AIzaSyC2qBiJzOitO345ed0T-BAVgnM0XRnOH8g">
      <GoogleMap
        mapContainerClassName="w-full h-[1860px]"
        center={center}
        zoom={13}
      >
        {apartments.map((apartment, index) => (
          <Marker key={index} position={{ lat: apartment.latitude, lng: apartment.longitude }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

function GeocodeArea({ area, district, onAreaSelect }) {

  const areaName = area + ", " + district;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    areaName
  )}&key=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ lat, lng });
        console.log("Geocoding success:", lat, lng);
      } else {
        console.error("Geocoding failed:", data.status);
      }
    })
    .catch((error) => console.error("Error:", error));
}
export { MapClickHandler, ShowApartments };
