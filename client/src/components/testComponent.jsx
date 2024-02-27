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

import LandingPageCard from "../components/LandingPageCard.jsx";
import LandingPageFooter from "../components/LandingPageFooter.jsx";

export default function Test_component({ st, pr }) {
  return (
    <div>
      state received : {st}, prop received : {pr}
    </div>
  );
}
