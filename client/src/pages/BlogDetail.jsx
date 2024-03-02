import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import "../styles/color.css";

import { Button } from "../components/button";
import { Img } from "../components/image";
import { Text } from "../components/text";
import { List } from "../components/list";
import { Slider } from "../components/slider";
import { ReactTable } from "../components/ReactTable";

import BlogPageColumnactive from "../components/BlogPageColumnactive";
import LandingPageFooter from "../components/LandingPageFooter";
import Carousel from "../components/Carousel";

const BlogDetail = () => {
  const tableData = React.useRef([
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
    {
      fullname: "Zakir Hossen",
      title: "UI, UX Designer",
      emailaddress: "uxdesigner@gmail.com",
      phonenumber: "+88 222 5554 444",
    },
  ]);
  const tableColumns = React.useMemo(() => {
    const tableColumnHelper = createColumnHelper();
    return [
      tableColumnHelper.accessor("fullname", {
        cell: (info) => (
          <Text
            className="flex-1 pb-[9px] pt-[17px] text-base text-gray-600"
            size="txtManropeSemiBold16Gray600"
          >
            {info?.getValue()}
          </Text>
        ),
        header: (info) => (
          <Text
            className="flex-1 min-w-[234px] py-2.5 text-gray-900 text-xs"
            size="txtManropeSemiBold12Gray900"
          >
            Full Name
          </Text>
        ),
      }),
      tableColumnHelper.accessor("title", {
        cell: (info) => (
          <Text
            className="flex-1 pb-[7px] pt-[19px] text-base text-gray-600"
            size="txtManropeSemiBold16Gray600"
          >
            {info?.getValue()}
          </Text>
        ),
        header: (info) => (
          <Text
            className="flex-1 min-w-[234px] py-2.5 text-gray-900 text-xs"
            size="txtManropeSemiBold12Gray900"
          >
            Title
          </Text>
        ),
      }),
      tableColumnHelper.accessor("emailaddress", {
        cell: (info) => (
          <Text
            className="flex-1 pb-[7px] pt-[19px] text-base text-gray-600"
            size="txtManropeSemiBold16Gray600"
          >
            {info?.getValue()}
          </Text>
        ),
        header: (info) => (
          <Text
            className="flex-1 min-w-[234px] py-2.5 text-gray-900 text-xs"
            size="txtManropeSemiBold12Gray900"
          >
            Email Address
          </Text>
        ),
      }),
      tableColumnHelper.accessor("phonenumber", {
        cell: (info) => (
          <Text
            className="flex-1 pb-[9px] pt-[17px] text-base text-gray-600"
            size="txtManropeSemiBold16Gray600"
          >
            {info?.getValue()}
          </Text>
        ),
        header: (info) => (
          <Text
            className="flex-1 min-w-[214px] py-2.5 text-gray-900 text-xs"
            size="txtManropeSemiBold12Gray900"
          >
            Phone Number
          </Text>
        ),
      }),
    ];
  }, []);

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentVoteStatuses, setCommentVoteStatuses] = useState([]);
  //const [owner, setOwner] = useState(null);
  const { id } = useParams();
  const { commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogResponse = await fetch(`/api/blogs/showBlog/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const userUpvoteStatusResponse = await fetch(
          `/api/blogs/checkUpvote/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const userDownvoteStatusResponse = await fetch(
          `/api/blogs/checkDownvote/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        console.log("in fetchBlog id:", id);

        if (
          blogResponse.ok &&
          userUpvoteStatusResponse.ok &&
          userDownvoteStatusResponse.ok
        ) {
          const blogData = await blogResponse.json();

          console.log(blogData.content);
          const hasUpvoted = await userUpvoteStatusResponse.json().hasUpvoted;
          const hasDownvoted = await userDownvoteStatusResponse.json()
            .hasDownvoted;

          setBlog(blogData);
          setHasUpvoted(hasUpvoted);
          setHasDownvoted(hasDownvoted);

          console.log("in fetchBlog blogData:", blogData);
        } else {
          console.error(
            "Error fetching blog details:",
            blogResponse.statusText
          );
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
        navigate("/404");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/blogs/showAllComments/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        console.log("in fetchComments response:", response);
        setComments(response.data);

        console.log("in fetchComments id:", id);

        const voteStatusResponse = await fetch(
          `/api/blogs/checkVoteComment/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        console.log("in fetchComments voteStatusResponse:", voteStatusResponse);
        if (voteStatusResponse.ok) {
          const voteStatusData = await voteStatusResponse.json();
          setCommentVoteStatuses(voteStatusData);
        } else {
          console.error(
            "Error fetching comment vote status:",
            voteStatusResponse.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id, navigate]);

  const handleUpVote = async () => {
    // If already downvoted, first reverse the downvote
    if (hasDownvoted) {
      await handleVoteChange(
        `/api/blogs/decreaseDownvoteBlog/${id}`,
        setHasDownvoted,
        "numOfDownvotes",
        -1
      );
    }

    const endpoint = hasUpvoted
      ? `/api/blogs/decreaseUpvoteBlog/${id}`
      : `/api/blogs/upvoteBlog/${id}`;
    await handleVoteChange(
      endpoint,
      setHasUpvoted,
      "numOfUpvotes",
      hasUpvoted ? -1 : 1
    );
  };

  const handleDownVote = async () => {
    // If already upvoted, first reverse the upvote
    if (hasUpvoted) {
      await handleVoteChange(
        `/api/blogs/decreaseUpvoteBlog/${id}`,
        setHasUpvoted,
        "numOfUpvotes",
        -1
      );
    }

    const endpoint = hasDownvoted
      ? `/api/blogs/decreaseDownvoteBlog/${id}`
      : `/api/blogs/downvoteBlog/${id}`;
    await handleVoteChange(
      endpoint,
      setHasDownvoted,
      "numOfDownvotes",
      hasDownvoted ? -1 : 1
    );
  };

  // Refactored vote handling logic to reduce duplication
  const handleVoteChange = async (endpoint, setState, countKey, delta) => {
    try {
      const response = await axios.put(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setState((prevState) => !prevState);
        setBlog((prevBlog) => ({
          ...prevBlog,
          [countKey]: prevBlog[countKey] + delta,
        }));
      }
    } catch (error) {
      console.error("Error voting on the blog:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/blogs/createComment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ blogId: id, content: comment }),
      });

      if (response.ok) {
        setComment("");
        // Optionally fetch updated blog data
        window.location.reload();
      } else {
        console.error("Error submitting the comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error during comment submission:", error);
    }
  };

  const handleCommentVoteChange = async (endpoint, index, newStatus) => {
    try {
      console.log("in handleCommentVoteChange endpoint:", endpoint);
      console.log("in handleCommentVoteChange newStatus:", newStatus);
      const response = await axios.put(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        // Directly update the specific index in the commentVoteStatuses array
        setCommentVoteStatuses((prevStatuses) =>
          prevStatuses.map((status, idx) =>
            idx === index ? newStatus : status
          )
        );
      }
    } catch (error) {
      console.error("Error voting on the comment:", error);
    }
  };

  const handleCommentUpvote = async (commentId, index) => {
    const currentStatus = commentVoteStatuses[index];
    const isCurrentlyUpvoted = currentStatus === 1;
    const isCurrentlyDownvoted = currentStatus === -1;
    let endpoint;

    console.log("in handleCommentUpvote currentStatus:", currentStatus);

    if (currentStatus === 1) {
      // Cancel the upvote
      endpoint = `/api/blogs/decreaseUpvoteComment/${commentId}`;
      await handleCommentVoteChange(endpoint, index, 0);
    } else {
      // Apply upvote
      if (currentStatus === -1) {
        // First, cancel the downvote
        await handleCommentVoteChange(
          `/api/blogs/decreaseDownvoteComment/${commentId}`,
          index,
          0
        );
      }
      // Then, apply the upvote
      endpoint = `/api/blogs/upvoteComment/${commentId}`;
      await handleCommentVoteChange(endpoint, index, 1);
    }
  };

  const handleCommentDownvote = async (commentId, index) => {
    const currentStatus = commentVoteStatuses[index];
    const isCurrentlyDownvoted = currentStatus === -1;
    const isCurrentlyUpvoted = currentStatus === 1;
    let endpoint;

    console.log("in handleCommentDownvote currentStatus:", currentStatus);

    if (currentStatus === -1) {
      // Cancel the downvote
      endpoint = `/api/blogs/decreaseDownvoteComment/${commentId}`;
      await handleCommentVoteChange(endpoint, index, 0);
    } else {
      // Apply downvote
      if (currentStatus === 1) {
        // First, cancel the upvote
        await handleCommentVoteChange(
          `/api/blogs/decreaseUpvoteComment/${commentId}`,
          index,
          0
        );
      }
      // Then, apply the downvote
      endpoint = `/api/blogs/downvoteComment/${commentId}`;
      await handleCommentVoteChange(endpoint, index, -1);
    }
  };

  if (!blog) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  const fetchOwnerInfo = async () => {
    var ownerInfo = null;
    try {
      ownerInfo = await fetch(`/api/users/getUserDetailsByID/${blog.author}`);
    } catch (err) {
      console.error(err);
      return { owner };
    }

    if (ownerInfo.ok) {
      const owner = await ownerInfo.json();
      console.log(owner);
      return { owner };
    }
  };

  const { ownerInfo } = fetchOwnerInfo();

  var profile_picture = null;

  // if(!ownerInfo.profilePicture){
  //   profile_picture = "../../public/img_reddit.svg";
  // }

  //console.log(profile_picture);

  const extractContent = (content, tagsData) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent || div.innerText || "";
    const images = div.querySelectorAll("img");
    const image = div.querySelector("img")
      ? div.querySelector("img").src
      : "default-image.jpg";
    const urls = Array.from(images).map((img) => img.getAttribute("src"));

    images.forEach((img) => img.remove());
    const contentWithoutImages = div.innerHTML;
    //setImageURLs(urls);
    let tags;
    try {
      tags = tagsData;
    } catch (error) {
      console.error("Error parsing tags:", error);
      tags = []; // Default to an empty array in case of parsing failure
    }

    console.log("in extractContent tags:", tags);

    console.log(contentWithoutImages);

    return { text, image, tags, urls, contentWithoutImages };
  };

  // useEffect(() => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(content, 'text/html');
  //   const images = doc.querySelectorAll('img');
  //   const urls = Array.from(images).map(img => img.getAttribute('src'));
  //   setImageURLs(urls);
  // }, [blog]);

  //console.log(imageURLs);

  //const sanitizedComments = DOMPurify.sanitize(blog.commentList);

  const { text, image, tags, urls, contentWithoutImages } = extractContent(
    blog.content,
    blog.tags
  );

  console.log(urls);

  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[111px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col font-manrope items-start justify-start pl-[120px] pr-[324px] md:px-10 sm:px-5 w-full">
          <div className="flex flex-col gap-10 py-[100px] items-start justify-start w-full">
            <Text
              className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
              size="txtManropeExtraBold36"
            >
              {blog.title}
            </Text>
            <div className="flex flex-col gap-6 items-start justify-start w-full">
              <Text
                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                size="txtManropeBold24Gray900"
              >
                Writen by
              </Text>
              <div className="flex flex-col items-center justify-between md:pr-10 sm:pr-5 pr-[568px] w-full">
                <div className="flex sm:flex-col flex-row gap-6 items-center justify-start max-w-[836px] w-full">
                  <Img
                    className="h-[100px] md:h-auto rounded-[50%] w-[100px]"
                    src="../../public/images/img_reddit.svg"
                    alt="profilepicture"
                  />
                  <div className="flex flex-col gap-2 items-start justify-start w-[165px]">
                    <Text
                      className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-auto"
                      size="txtManropeBold24Gray900"
                    >
                      {blog.authorName}
                    </Text>
                  </div>
                  <div className="flex flex-row gap-1.5 items-center justify-start w-auto">
                    <div className="bg-bluegray-100 h-2 rounded-[50%] w-2"></div>
                    <Text
                      className="text-base text-gray-600 w-auto"
                      size="txtManropeSemiBold16Gray600"
                    >
                      {new Date(blog.createdAt).toLocaleString()}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:gap-10 gap-[84px] items-start justify-start w-full">
              <div className="flex md:flex-col flex-row gap-4 items-end justify-between w-full">
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <Text
                    className="leading-[180.00%] text-gray-600 text-lg"
                    size="txtManropeRegular18Gray600"
                  >
                    <>
                      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </>
                  </Text>
                </div>
                <div className="flex md:flex-1 flex-col items-center justify-start w-[11%] md:w-full">
                  <div className="flex flex-col gap-4 items-start justify-start w-auto">
                    <Img
                      className="h-8 w-8"
                      src="../../public/images/img_facebook.svg"
                      alt="facebook"
                    />
                    <div className="flex flex-row gap-1 items-center justify-start w-auto">
                      <Img
                        className="h-8 w-8"
                        src="../../public/images/img_volume.svg"
                        alt="volume"
                      />
                      <div className="flex flex-col items-center justify-start w-[71%]">
                        <div
                          className="bg-cover bg-no-repeat flex flex-col h-[25px] items-center justify-start w-auto"
                          style={{
                            backgroundImage:
                              "url('../../public/images/img_frame1000001658.svg')",
                          }}
                        >
                          <Text
                            className="text-gray-900 text-xs w-auto"
                            size="txtManropeSemiBold12Gray900"
                          >
                            Share this
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Img
                      className="h-8 w-8"
                      src="../../public/images/img_twitter_bluegray_100.svg"
                      alt="twitter"
                    />
                    <Img
                      className="h-8 w-8"
                      src="../../public/images/img_reddit.svg"
                      alt="reddit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upvote/Downvote */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleUpVote}
              className={`p-2 border rounded-full hover:bg-gray-100 text-black ${
                hasUpvoted ? "bg-green-600" : "bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {/* Use an arrow-up icon for upvoted */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <span className="text-xl font-bold">{blog.numOfUpvotes || 0}</span>
            <button
              onClick={handleDownVote}
              className={`p-2 border rounded-full hover:bg-gray-100 text-black ${
                hasDownvoted ? "bg-red-600" : "bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {/* Use an arrow-down icon for downvoted */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <span className="text-xl font-bold">
              {blog.numOfDownvotes || 0}
            </span>
          </div>

          {/* Comment section */}

          <div className="px-4 py-4 sm:px-6 border-t">
            <form onSubmit={handleCommentSubmit} className="flex items-start justify-start">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="Post your comment now~"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                className="ml-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Send
              </button>
            </form>
          </div>

          {/* Some random shit */}

          <div className="items-start justify-start container max-w-2xl mx-auto">
            <h1 className="text-3xl font-semibold pt-5 pb-2">Comments</h1>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={comment._id}
                  className="bg-yellow-50-custom p-3 my-2 rounded-2xl shadow"
                >
                  <p className="break-words text-xl">{comment.content}</p>

                  <div className="text-xs text-gray-500">
                    {comment.authorName} -{" "}
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>

                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleCommentUpvote(comment._id, index)}
                      className={`p-2 border rounded-full hover:bg-gray-100 text-black ${
                        commentVoteStatuses[index] === 1
                          ? "bg-green-600"
                          : "bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <span className="text-xl font-bold">
                      {comment.numOfUpvotes || 0}
                    </span>
                    <button
                      onClick={() => handleCommentDownvote(comment._id, index)}
                      className={`p-2 border rounded-full hover:bg-gray-100 text-black ${
                        commentVoteStatuses[index] === -1
                          ? "bg-red-600"
                          : "bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <span className="text-xl font-bold">
                      {comment.numOfDownvotes || 0}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
        <div className="flex flex-col font-manrope items-start justify-start md:px-10 sm:px-5 px-[120px] w-full">
          <div className="flex flex-col gap-10 items-start justify-start max-w-[1200px] mx-auto w-full">
            <Text
              className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
              size="txtManropeExtraBold36"
            >
              Recent News
            </Text>
            <List
              className="sm:flex-col flex-row gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-start w-full"
              orientation="horizontal"
            >
              {new Array(3).fill({}).map((props, index) => (
                <React.Fragment key={`BlogPageColumnactive${index}`}>
                  <BlogPageColumnactive
                    className="flex flex-1 flex-col gap-6 items-start justify-start w-full"
                    {...props}
                  />
                </React.Fragment>
              ))}
            </List>
          </div>
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
  return (
    <div className="bg-yellow-50-custom min-h-screen pt-16">
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white-A700 rounded-lg shadow overflow-hidden">
          {/* Post Header */}
          <div className="px-4 py-5 sm:px-6 border-b">
            <Text
              className="leading-[140.00%] sm:text-4xl md:text-[42px] text-[46px] text-gray-900 tracking-[-0.92px] text-center"
              size="txtManropeExtraBold46"
            >
              {blog.title}
            </Text>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 text-center">
              {blog.authorName} - {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
          {/* Post Content */}
          <div className="px-4 py-5 sm:p-6 ">
            <div
              className="prose max-w-none text-[25px]"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            {/* get the image */}
            <div className="object-center">
              <img
                src={image}
                className="h-2/3 w-2/3 object-center object-cover"
                alt={blog.title}
              />
            </div>
            {/* get the tags*/}
            <div className="flex justify-left space-x-4 mt-5">
              {tags.map((tag) => (
                <Link to={`/blogHome/${tag}`} key={tag}>
                  <span
                    key={tag}
                    className="py-1 px-3 text-sm font-semibold bg-gray-401 rounded-full text-gray-700 mb-2"
                  >
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleUpVote}
              className={`p-2 border rounded-full hover:bg-gray-100 text-black ${
                hasUpvoted ? "bg-green-600" : "bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {/* Use an arrow-up icon for upvoted */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <span className="text-xl font-bold">{blog.numOfUpvotes || 0}</span>
            <button
              onClick={handleDownVote}
              className={`p-2 border rounded-full hover:bg-gray-100 text-black ${
                hasDownvoted ? "bg-red-600" : "bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {/* Use an arrow-down icon for downvoted */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <span className="text-xl font-bold">
              {blog.numOfDownvotes || 0}
            </span>
          </div>
          {/* Comment Section */}
          <div className="px-4 py-4 sm:px-6 border-t">
            <form onSubmit={handleCommentSubmit} className="flex items-center">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="Post your comment now~"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                className="ml-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Send
              </button>
            </form>
          </div>

          {/* show all the comments sorted by time. My commentlist stores comment ids, so we have to fetch the comments first. */}
          {/* <div className="px-4 py-4 sm:px-6 border-t">
            <h2 className="text-lg font-semibold mb-3">Comments</h2>
            <ul>
              {blog.commentList.map((commentId) => (
                <li key={commentId}>
                  <Comment commentId={commentId} />
                </li>
              ))}
            </ul>
          </div> 
          
          */}

          <div className="container p-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-semibold pt-5 pb-2">Comments</h1>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={comment._id}
                  className="bg-yellow-50-custom p-3 my-2 rounded-2xl shadow"
                >
                  <p className="break-words text-xl">{comment.content}</p>

                  <div className="text-xs text-gray-500">
                    {comment.authorName} -{" "}
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>

                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleCommentUpvote(comment._id, index)}
                      className={`p-2 border rounded-full hover:bg-gray-100 text-black ${
                        commentVoteStatuses[index] === 1
                          ? "bg-green-600"
                          : "bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <span className="text-xl font-bold">
                      {comment.numOfUpvotes || 0}
                    </span>
                    <button
                      onClick={() => handleCommentDownvote(comment._id, index)}
                      className={`p-2 border rounded-full hover:bg-gray-100 text-black ${
                        commentVoteStatuses[index] === -1
                          ? "bg-red-600"
                          : "bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <span className="text-xl font-bold">
                      {comment.numOfDownvotes || 0}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
