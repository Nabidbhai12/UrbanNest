import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "../components/button";
import { Img } from "../components/image";
import { List } from "../components/list";
import { Text } from "../components/text";


import LandingPageFooter from "../components/LandingPageFooter";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[116px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col font-manrope gap-[30px] items-center justify-start md:px-5 w-auto sm:w-full">
          <Img
            className="h-[480px] w-[464px]"
            src="images/img_frame1000001686.svg"
            alt="frame1000001686"
          />
          <div className="flex flex-col gap-6 items-center justify-start w-auto">
            <Text
              className="sm:text-2xl md:text-[26px] text-[28px] text-center text-gray-900 tracking-[-0.56px] w-auto"
              size="txtManropeExtraBold28"
            >
              Something wrong!
            </Text>
            <Button
              className="common-pointer border border-gray-600 hover:border-orange-800 border-solid cursor-pointer flex items-center justify-center min-w-[157px] px-[15px] py-[17px] rounded-[10px]"
              onClick={() => navigate("/")}
              rightIcon={
                <Img
                  className="h-5 mb-[5px] ml-2.5"
                  src="images/img_arrowright_gray_900.svg"
                  alt="arrow_right"
                />
              }
            >
              <div className="font-bold text-gray-900 text-left text-lg hover:text-orange-800">
                Homepage
              </div>
            </Button>
          </div>
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default ErrorPage;
