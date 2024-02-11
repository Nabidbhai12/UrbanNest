import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import '../styles/color.css';


const EditBlog = () => {
    const [blog, setBlog] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try{
                console.log("blogid in usereffect: ", id);
                const response = await fetch(`/api/blogs/showBlog/${id}`);
                const data = await response.json();

                setBlog(data);

                console.log("in fetchblog: ", data);

            }catch(error){
                console.error('Error fetching blog:', error);
            }
        }

        fetchBlog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventdefault();

        const formdata = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated string back to array
            image,
        };

        try{
            const response = await axios.put(`/api/blogs/updateBlog/${id}`, formdata);
            console.log('Blog submitted:', response.data);
            alert('Blog updated successfully!');
        }catch(error){
            console.error('Error submitting blog:', error);
        }
    }

};

export default EditBlog;