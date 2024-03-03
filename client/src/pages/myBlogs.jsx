// shows all blogs of a user. It is a protected route.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser"; // Used to parse HTML strings
import "../styles/color.css";
import LandingPageHeader from "../components/LandingPageHeader";
import LandingPageFooter from "../components/LandingPageFooter";
import { Img } from "../components/image";
import { Text } from "../components/text";
import { List } from "../components/list";
import { Slider } from "../components/slider";
import { Button } from "../components/button";
import { set } from "mongoose";

import BlogPageColumnactive from "../components/BlogPageColumnactive";

const myBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyLoginStatus = async () => {
      try {
        const response = await axios.get("/api/users/verify", {
          withCredentials: true,
        });
        setIsLoggedIn(response.data.isLoggedIn);
        console.log("Login status:", response.data.isLoggedIn);
      } catch (error) {
        console.error("Error verifying login status:", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs/showMyBlogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        console.log("data received by client side : ", data);

        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    verifyLoginStatus();
    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(blogs?.length / blogsPerPage);
  console.log(totalPages);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const extractContent = (content) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent || div.innerText || "";
    const image = div.querySelector("img")
      ? div.querySelector("img").src
      : "default-image.jpg";
    return { text, image };
  };

  const handleEdit = (blogid) => {
    navigate(`/editBlog/${blogid}`);
  };

  const handleDelete = async (blogid) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await axios.delete(`/api/blogs/deleteBlog/${blogid}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setBlogs(blogs.filter((blog) => blog._id !== blogid));
          navigate("/myBlogs");
        }
      } catch {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone items-start justify-start mx-auto w-auto sm:w-full md:w-full pt-[50px]">
        <div className="flex flex-col md:gap-10 gap-[68px] items-center justify-start w-full">
          <div className="flex flex-col font-manrope items-center justify-start md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-start max-w-[1200px] mx-auto w-full">
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <Text
                  className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
                  size="txtManropeExtraBold36"
                >
                  Real Estate News & Blogs
                </Text>
                <div className="gap-4 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 items-start justify-start w-full">
                  {/*<SelectBox
                    className="bg-white-A700 border border-bluegray-100 border-solid flex-1 font-bold pb-3.5 pt-[18px] px-[15px] rounded-[10px] text-gray-600 text-left text-lg w-full"
                    placeholderClassName="text-gray-600"
                    indicator={
                      <Img
                        className="h-6 w-6"
                        src="images/img_arrowdown_gray_600_24x24.svg"
                        alt="arrow_down"
                      />
                    }
                    isMulti={false}
                    name="dropdownlarge"
                    options={dropdownlargeOptionsList}
                    isSearchable={false}
                    placeholder="Category"
                  />
                  <SelectBox
                    className="bg-white-A700 border border-bluegray-100 border-solid flex-1 font-bold pb-3.5 pt-[18px] px-4 rounded-[10px] text-gray-600 text-left text-lg w-full"
                    placeholderClassName="text-gray-600"
                    indicator={
                      <Img
                        className="h-6 w-6"
                        src="images/img_arrowdown_gray_600_24x24.svg"
                        alt="arrow_down"
                      />
                    }
                    isMulti={false}
                    name="dropdownlarge_One"
                    options={dropdownlargeOneOptionsList}
                    isSearchable={false}
                    placeholder="Popular"
                  />*/}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="md:gap-5 gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
                  {currentBlogs.map((props, index) => (
                    <React.Fragment key={`BlogPageColumnactive${index}`}>
                      <BlogPageColumnactive
                        className="flex flex-1 flex-col pb-[30px] gap-6 items-start justify-start w-full hover:shadow-xl rounded-[20px]"
                        {...props}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                <div className="flex flex-row gap-[5px] items-start justify-start w-auto pb-[10px]">
                  {pageNumbers.map((number) => (
                    <Button
                      key={number}
                      className={`border border-gray-700 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12 ${
                        currentPage === number ? "bg-black text-white-A700" : ""
                      } text-white rounded`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            {isLoggedIn && (
              <Link
                to="/createBlog"
                className="fixed bottom-4 right-4 bg-orange-800 hover:bg-orange-700 text-white font-bold p-4 rounded-full text-3xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    d="M12 5v14m7-7H5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default myBlogs;
