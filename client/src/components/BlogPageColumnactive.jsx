import React, { useEffect } from "react";

import { Button } from "./button";
import { Img } from "./image";
import { Text } from "./text";
import { Link } from "react-router-dom";
//import { Button, Img, Text } from "components";

const BlogPageColumnactive = (props) => {
  const extractContent = (content) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent || div.innerText || "";
    const image = div.querySelector("img")
      ? div.querySelector("img").src
      : "default-image.jpg";

    return { text, image };
  };

  const convertDate = (date) => {
    // Example date string
    const dateString = date;

    // Convert to Date object
    const dateObj = new Date(dateString);

    // Convert to desired format: "<month-name> <month-date>, <year>"
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    //console.log(formattedDate); // Output: "February 29, 2024"
    return { formattedDate };
  };

  //console.log(props.content);
  //console.log(extractContent(props.content).image);
  //console.log(props.content);
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col gap-3 items-start justify-start w-full">
          <Img
            className="h-[350px] sm:h-auto object-cover rounded-bl-lg rounded-br-lg w-full rounded-[10px]"
            src={extractContent(props.content).image}
            alt="rectangle5617"
          />
          <div className="flex flex-col pt-[6px] pl-[6px] gap-2 items-start justify-start w-full cursor-pointer rounded-[10px]">
            <Button className="border border-bluegray-100 border-solid cursor-pointer font-manrope font-semibold min-w-[89px] py-[9px] rounded-[10px] text-center text-gray-900 text-sm">
              {props?.business}
            </Button>
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <Text
                className="leading-[135.00%] md:max-w-full max-w-sm text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px]"
                size="txtManropeBold24Gray900"
              >
                {props?.title}
              </Text>
              <div className="flex flex-row gap-[50px] items-start justify-start md:pr-10 sm:pr-5 pr-[184px] w-full">
                <div className="flex flex-row gap-1.5 items-center justify-start pr-0.5 pt-0.5 w-1/2">
                  <div className="bg-bluegray-100 h-[5px] my-1.5 rounded-sm w-[5px]"></div>
                  <Text
                    className="text-gray-600 text-xs"
                    size="txtManropeSemiBold12"
                  >
                    {convertDate(props.createdAt).formattedDate}
                  </Text>
                </div>
                <div className="flex flex-row gap-1.5 items-center justify-center w-1/2">
                  <div className="bg-bluegray-100 h-[5px] my-1.5 rounded-sm w-[5px]"></div>
                  <Text
                    className="mr-[17px] text-gray-600 text-xs"
                    size="txtManropeSemiBold12"
                  >
                    {props?.time}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-start w-full">
          <Link to={`/blogHome/${props._id}`}>
            <div className="flex flex-row gap-[6px]">
              <Button
                className="cursor-pointer text-black hover:text-orange-900 font-bold text-lg w-auto pl-[6px]"
                size="txtManropeBold18Gray600"
              >
                Continue Reading
              </Button>
              <Img
                className="cursor-pointer h-6 w-6 pt-[7px]"
                src="images/img_arrowright_gray_600.svg"
                alt="arrowright"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

BlogPageColumnactive.defaultProps = {
  business: "Business",
  title: "10 Delightful Dining Room Decor Trends for Spring",
  createdAt: "July 20, 2022",
  time: "7 min read",
  active: "Continue Reading",
};

export default BlogPageColumnactive;
