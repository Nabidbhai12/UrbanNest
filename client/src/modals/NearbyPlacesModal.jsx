import React, { useState, useEffect } from "react";
import { default as ModalProvider } from "react-modal";

import { Button } from "../components/button";
import { CheckBox } from "../components/checkBox";
import { Img } from "../components/image";
import { Input } from "../components/input";
import { Line } from "../components/line";
import { Text } from "../components/text";
import { NearbyPlacesComponent } from "../components/GoogleMap";

const NearbyPlacesModal = ({ center, type, ...props }) => {
  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto w-[1600px] items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-900_cc flex items-center justify-center"
      {...props}
    >
      <div className="m-auto sm:max-w-full md:max-w-full w-full">
        <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start md:px-5 px-[30px] py-10 rounded-[10px] w-full">
          <div className="flex flex-col gap-8 items-center justify-center w-full">
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-row gap-2 w-full items-center justify-center">
                    {/*
                  <div className="flex flex-row gap-2 w-1/12 items-end justify-end">
                    <Img
                      className="common-pointer h-[30px] w-[30px]"
                      src="images/img_close_gray_900.svg"
                      alt="close"
                      onClick={props.onRequestClose}
                    />
                  </div>
                    */}
                </div>
                <div className="flex flex-row gap-2 items-center justify-start w-full">
                    <NearbyPlacesComponent center={center} type={type} />
                </div>
                {/*
                <div className="flex flex-row gap-2 items-center justify-start w-full">
                  <MapClickHandler
                    latitude={latitude}
                    longitude={longitude}
                    zoom={13}
                    onLocationSelect={onLocationSelect}
                  />
                </div>
                */}
                <div className="flex flex-row gap-2 items-center justify-start w-full">
                  <div className="flex flex-row gap-2 items-center pl-[700px] justify-start w-full">
                    <button
                      type="submit"
                      onClick={props.onRequestClose}
                      className="flex font-extrabold font-manrope shadow-xl transition duration-300 ease-in-out cursor-pointer  items-center justify-center px-[50px] py-[10px] bg-gray-200 text-black rounded-[30px] hover:bg-black hover:text-white-A700"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*<Line className="bg-bluegray-100 h-px w-full" />*/}
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default NearbyPlacesModal;