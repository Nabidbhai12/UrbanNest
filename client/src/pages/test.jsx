// "use client";

// import { useState } from "react";
// import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"

// export default function map(){
//   const position = { lat: 53.54, lng: 10 };

//   return(
//     <APIProvider apiKey="AIzaSyC2qBiJzOitO345ed0T-BAVgnM0XRnOH8g">
//       <div className="w-full h-[100vh]">
//         <Map zoom={9} center={position}>

//         </Map>
//       </div>
//     </APIProvider>
//   );
// }

import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 23.8041,
  lng: 90.4152,
};

function MyMapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyC2qBiJzOitO345ed0T-BAVgnM0XRnOH8g">
      <div className="w-full h-[100vh]">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default React.memo(MyMapComponent);
