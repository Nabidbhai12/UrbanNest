import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser'; // Install this package to parse HTML

const BlogHome = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6; // 3+3 blogs per page

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/blogs/recent');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

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

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="grid grid-cols-2 gap-4">
                    {currentBlogs.map((blog) => {
                        const { text, image } = extractContent(blog.content);
                        return (
                            <div key={blog._id} className="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-105">
                                <Link to={`/blogHome/${blog._id}`}>
                                    <div className="bg-white hover:shadow-xl rounded-lg overflow-hidden" style={{ height: '300px', width: '300px' }}>
                                        <img src={image} alt={blog.title} className="w-full object-cover h-48" />
                                        <div className="p-4 h-52">
                                            <h2 className="font-bold text-lg mb-2">{blog.title}</h2>
                                            <p className="text-gray-700 text-sm">{parse(text.substring(0, 100))}...</p>
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

export default BlogHome;
