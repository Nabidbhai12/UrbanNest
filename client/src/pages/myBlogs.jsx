// shows all blogs of a user. It is a protected route. 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser'; // Used to parse HTML strings
import '../styles/color.css';
import LandingPageHeader from "../components/LandingPageHeader";
import { Img } from "../components/image";
import { Text } from "../components/text";
import { List } from "../components/list";
import { Slider } from "../components/slider";
import { set } from 'mongoose';

const myBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch ('/api/blogs/showMyBlogs',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data=await response.json();
                console.log('data received by client side : ', data);

                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }

        fetchBlogs();
    }, []);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const extractContent = (content) => {
        const div = document.createElement('div');
        div.innerHTML = content;
        const text = div.textContent || div.innerText || '';
        const image = div.querySelector('img') ? div.querySelector('img').src : 'default-image.jpg';
        return { text, image };
    };

    return(
        // {isLoggedIn && <CreateBlogDialog />} {
        //     /* Conditionally render CreateBlogDialog based on isLoggedIn */
            
        // }
        <div className='background bg-yellow-50-custom'>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex flex-wrap -m-4"> {/* Use flexbox for a responsive layout */}
                        {currentBlogs.map((blog) => {
                            const { text, image } = extractContent(blog.content);
                            return (
                            <div key={blog._id} className="p-4 lg:w-1/3 md:w-1/2"> {/* Adjust the width per card based on screen size */}
                                <Link to={`/blogHome/${blog._id}`}>
                                    <div className="h-full  bg-white-A700 hover:shadow-xl rounded-3xl overflow-hidden" style={{width: '400px', height: '400px'}}>
                                        <img src={image} alt={blog.title} className="lg:h-48 md:h-36 w-full object-cover object-center" />
                                        <div className="p-6">
                                        <Text
                                            className="leading-[140.00%] sm:text-4xl md:text-[42px] text-[46px] text-gray-900 tracking-[-0.92px]"
                                            size="txtManropeExtraBold46"
                                        >
                                            {blog.title}
                                        </Text>
                                            <p className="leading-relaxed text-base">{parse(text.substring(0, 100))}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            );
                        })}
                    </div>
                    <Pagination blogsPerPage={blogsPerPage} totalBlogs={blogs.length} paginate={paginate} />
                </div>
            </div>
        </div>
    );
};

const Pagination = ({ blogsPerPage, totalBlogs, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="flex justify-center space-x-2">
                {pageNumbers.map(number => (
                    <li key={number} className="inline">
                        <a onClick={() => paginate(number)} href="#!" className="text-gray-600 hover:text-gray-900">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default myBlogs;