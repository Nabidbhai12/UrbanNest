import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import '../styles/color.css';
import { Img } from "../components/image";
import { Text } from "../components/text";
import { List } from "../components/list";
import { Slider } from "../components/slider";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentUpvote, setCommentUpvote] = useState(false);
  const [commentDownvote, setCommentDownvote] = useState(false);
  const { id } = useParams();
  const { commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogResponse = await fetch(`/api/blogs/showBlog/${id}`);
        const userUpvoteStatusResponse = await fetch(`/api/blogs/checkUpvote/${id}`, {});

        const userDownvoteStatusResponse = await fetch(`/api/blogs/checkDownvote/${id}`, {});
  
        if (blogResponse.ok && userUpvoteStatusResponse.ok && userDownvoteStatusResponse.ok) {
          const blogData = await blogResponse.json();
          const hasUpvoted = await userUpvoteStatusResponse.json().hasUpvoted;
          const hasDownvoted = await userDownvoteStatusResponse.json().hasDownvoted;
  
          setBlog(blogData);
          setHasUpvoted(hasUpvoted);
          setHasDownvoted(hasDownvoted);
        } else {
          console.error('Error fetching blog details:', blogResponse.statusText);
          navigate('/404');
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
        navigate('/404');
      }
    };

    const fetchComments = async () => {
      try{
        const response = await axios.get(`/api/blogs/showAllComments/${id}`);

        const commentIds = response.data;

        const cmdTemp = [];

        for(let i = 0; i < commentIds.length; i++){
          const userCommentUpvoteStatusResponse = await fetch(`/api/blogs/checkUpvoteComment/${commentIds[i]}`, {});
          const userCommentDownvoteStatusResponse = await fetch(`/api/blogs/checkDownvoteComment/${commentIds[i]}`, {});

          if (response.ok && userCommentUpvoteStatusResponse.ok && userCommentDownvoteStatusResponse.ok) {
            const commentData = await response.json();
            cmdTemp.push(commentData);
            const hasUpvoted = await userCommentUpvoteStatusResponse.json().hasUpvoted;
            const hasDownvoted = await userCommentDownvoteStatusResponse.json().hasDownvoted;
    
            setCommentUpvote(hasUpvoted);
            setCommentDownvote(hasDownvoted);
          }else{
            console.error('Error fetching comments:', response.statusText);
            navigate('/404');
          }

          setComments(cmdTemp);
        }

        //response.data is an array of comments
        //need loop through the array and check if the user has upvoted or downvoted the comment
        

        

        /* const userCommentUpvoteStatusResponse = await fetch(`/api/blogs/checkUpvoteComment/${commentId}`, {});
        const userCommentDownvoteStatusResponse = await fetch(`/api/blogs/checkDownvoteComment/${commentId}`, {});

        if (response.ok && userCommentUpvoteStatusResponse.ok && userCommentDownvoteStatusResponse.ok) {
          const commentData = await response.json();
          const hasUpvoted = await userCommentUpvoteStatusResponse.json().hasUpvoted;
          const hasDownvoted = await userCommentDownvoteStatusResponse.json().hasDownvoted;
  
          setComments(commentData);
          setHasUpvoted(hasUpvoted);
          setHasDownvoted(hasDownvoted);
        }else{
          console.error('Error fetching comments:', response.statusText);
          navigate('/404');
        }
        console.log("Comments: ", response.data); */
        setComments(response.data);
      }catch(error){
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchBlog();
    fetchComments();
  }, [id, navigate]);

  const handleUpVote = async () => {
    // If already downvoted, first reverse the downvote
    if (hasDownvoted) {
      await handleVoteChange(`/api/blogs/decreaseDownvoteBlog/${id}`, setHasDownvoted, 'numOfDownvotes', -1);
    }

    const endpoint = hasUpvoted ? `/api/blogs/decreaseUpvoteBlog/${id}` : `/api/blogs/upvoteBlog/${id}`;
    await handleVoteChange(endpoint, setHasUpvoted, 'numOfUpvotes', hasUpvoted ? -1 : 1);
  };

  const handleDownVote = async () => {
    // If already upvoted, first reverse the upvote
    if (hasUpvoted) {
      await handleVoteChange(`/api/blogs/decreaseUpvoteBlog/${id}`, setHasUpvoted, 'numOfUpvotes', -1);
    }

    const endpoint = hasDownvoted ? `/api/blogs/decreaseDownvoteBlog/${id}` : `/api/blogs/downvoteBlog/${id}`;
    await handleVoteChange(endpoint, setHasDownvoted, 'numOfDownvotes', hasDownvoted ? -1 : 1);
  };

  // Refactored vote handling logic to reduce duplication
  const handleVoteChange = async (endpoint, setState, countKey, delta) => {
    try {
      const response = await axios.put(endpoint);
      if (response.status === 200) {
        setState(prevState => !prevState);
        setBlog(prevBlog => ({
          ...prevBlog,
          [countKey]: prevBlog[countKey] + delta,
        }));
      }
    } catch (error) {
      console.error('Error voting on the blog:', error);
    }
  };  
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/blogs/createComment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blogId: id, content: comment }),
      });
  
      if (response.ok) {
        setComment('');
        // Optionally fetch updated blog data
        window.location.reload();
      } else {
        console.error('Error submitting the comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error during comment submission:', error);
    }
  };

  const handleCommentUpvote = async (commentId) => {
    try{
      if(commentUpvote){
        await handleCommentVoteChange(`/api/blogs/decreaseUpvoteComment/${commentId}`, setCommentUpvote, 'numOfUpvotes', -1);
      }

      const endpoint = commentUpvote ? `/api/blogs/decreaseUpvoteComment/${commentId}` : `/api/blogs/upvoteComment/${commentId}`;
    }catch(error){
      console.error('Error upvoting the comment:', error);
    }
  };

  const handleCommentDownvote = async (commentId) => {

  };

  const handleCommentVoteChange = async (endpoint, setState, countKey, delta) => {
    try{
      const response = await axios.put(endpoint);
      if(response.status === 200){
        setState(prevState => !prevState);
        setComment(prevComment => ({
          ...prevComment,
          [countKey]: prevComment[countKey] + delta,
        }));
      }
    }catch(error){
      console.error('Error voting on the comment:', error);
    }
  };
  

  if (!blog) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  const extractContent = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    const image = div.querySelector('img') ? div.querySelector('img').src : 'default-image.jpg';
    return { text, image };
  };
  //const sanitizedComments = DOMPurify.sanitize(blog.commentList);

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
            <p className="mt-1 max-w-2xl text-sm text-gray-500 text-center">{blog.authorName} - {new Date(blog.createdAt).toLocaleString()}</p>
          </div>
          {/* Post Content */}
          <div className="px-4 py-5 sm:p-6 ">
            <div className="prose max-w-none text-[25px]" dangerouslySetInnerHTML={{ __html: extractContent(blog.content).text }} />
            {/* get the image */}
            <div className='object-center'>
              <img
                src={extractContent(blog.content).image}
                className="h-2/3 w-2/3 object-center object-cover"
                alt={blog.title}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleUpVote}
              className={`p-2 border rounded-full hover:bg-gray-100 text-black ${hasUpvoted ? 'bg-green-600' : 'bg-gray-100'}`}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <span className="text-xl font-bold">{blog.numOfUpvotes || 0}</span>
            <button
              onClick={handleDownVote}
              className={`p-2 border rounded-full hover:bg-gray-100 text-black ${hasDownvoted ? 'bg-red-600' : 'bg-gray-100'}`}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <span className="text-xl font-bold">{blog.numOfDownvotes || 0}</span>
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
          </div> */}
          <div className="container p-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-semibold pt-5 pb-2">Comments</h1>
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment._id} className="bg-yellow-50-custom p-3 my-2 rounded-2xl shadow">
                  {/* display comment so that text wraps to next line if exceeds container length */}
                  <p className="break-words text-xl">{comment.content}</p>
                  {/* Display additional comment information such as author and timestamp if available */}
                  <div className="text-xs text-gray-500">
                    {comment.authorName} - {new Date(comment.createdAt).toLocaleString()}
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
