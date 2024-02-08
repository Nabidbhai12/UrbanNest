import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogResponse = await fetch(`/api/blogs/showBlog/${id}`);
        const userUpvoteStatusResponse = await fetch(`/api/blogs/checkUpvote/${id}`, {
          // Add necessary headers for authentication, e.g.,
          // headers: {
          //   'Authorization': `Bearer ${token}`,
          // },
        });
  
        if (blogResponse.ok && userUpvoteStatusResponse.ok) {
          const blogData = await blogResponse.json();
          const hasUpvoted = await userUpvoteStatusResponse.json().hasUpvoted;
  
          setBlog(blogData);
          setHasUpvoted(hasUpvoted);
        } else {
          console.error('Error fetching blog details:', blogResponse.statusText, userUpvoteStatusResponse.statusText);
          navigate('/404');
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
        navigate('/404');
      }
    };
  
    fetchBlog();
  }, [id, navigate]);
  

    const handleVote = async () => {
      const endpoint = hasUpvoted ? `/api/blogs/downvoteBlog/${id}` : `/api/blogs/upvoteBlog/${id}`;
      try {
        const response = await axios.put(endpoint);
        if (response.status === 200) {
          setHasUpvoted(!hasUpvoted);
          setBlog({
            ...blog,
            numOfUpvotes: hasUpvoted ? blog.numOfUpvotes - 1 : blog.numOfUpvotes + 1,
          });
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
      } else {
        console.error('Error submitting the comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error during comment submission:', error);
    }
  };
  

  if (!blog) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b">
            <h1 className="text-3xl leading-6 font-medium text-gray-900">{blog.title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{blog.authorName}</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
          <div className="px-4 py-4 sm:px-6">
            <button
              onClick={handleVote}
              className={`px-4 py-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 ${hasUpvoted ? 'bg-red-100 text-red-800' : ''}`}
            >
              {hasUpvoted ? 'Downvote' : 'Upvote'}
            </button>
            <span className="text-sm font-medium text-gray-500 ml-2">{blog.numOfUpvotes || 0} upvotes</span>
          </div>
          <div className="px-4 py-4 sm:px-6 border-t">
            <form onSubmit={handleCommentSubmit} className="mt-1 flex">
              <textarea
                className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                rows="3"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm leading-5 font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
              >
                Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
