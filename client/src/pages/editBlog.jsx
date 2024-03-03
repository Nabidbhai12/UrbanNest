// NewBlogPost.js
import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios"; // Make sure to install axios if not already
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useParams } from "react-router-dom";
import { set } from "mongoose";
import LandingPageFooter from "../components/LandingPageFooter";

Quill.register("modules/imageResize", ImageResize);

const EditBlog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const [preview, setPreview] = useState(false);
  const quillRef = React.useRef();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("blogid in usereffect: ", id);
        const response = await fetch(`/api/blogs/showBlog/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.join(", "));
        setImageUrls(data.imageUrls || []);

        setBlog(data);

        console.log("in fetchblog: ", data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.getModule("toolbar").addHandler("image", imageHandler);
    }

    fetchBlog();
  }, [id]);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        const formData = new FormData();
        formData.append("image", file);
        console.log(file);
        // Assuming '/api/images/upload' is your image upload endpoint
        const response = await fetch("/api/blogs/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await response.json(); // Parse the JSON from the response
        console.log(data);
        const imageUrl = data.url; // URL from the server
        setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        const index = range ? range.index : 0;
        editor.insertEmbed(index, "image", imageUrl);
      } else {
        console.warn("You can only upload images.");
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = tags.split(",").map((tag) => tag.trim());
    let formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("tags", JSON.stringify(tagsArray));
    formdata.append("imageUrls", JSON.stringify(imageUrls));

    try {
      const response = await axios.put(
        `/api/blogs/updateBlog/${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Blog submitted:", response.data);
      alert("Blog updated successfully!");
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
    },
  };

  return (
    <div className="flex flex-col bg-[url('../../public/images/img_create_blog_bg.jpeg')] min-h-screen pt-16 align-center justify-center">
      <div className="flex flex-col items-center justify-center pb-[50px]">
        <form
          onSubmit={handleSubmit}
          className="content-center px-4 py-5 sm:px-6 border-b space-y-6 bg-white-A700 p-8 rounded-[40px] shadow-lg w-[70%] items-center justify-center"
        >
          <div>
            <label
              htmlFor="title"
              className="bg-black text-white-A700 px-4 py-2 mb-[10px] w-[150px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="block w-full text-lg text-gray-900 bg-gray-50 rounded-lg border font-extrabold font-manrope font-la border-black p-2.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="bg-black text-white-A700 px-4 py-2 mb-[10px] w-[250px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="block w-full text-lg text-gray-900 bg-gray-50 rounded-lg border font-extrabold font-manrope font-la border-black p-2.5"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="bg-black text-white-A700 px-4 py-2 mb-[10px] w-[150px] h-[50px] flex items-center justify-center rounded-[25px] font-extrabold font-manrope"
            >
              Content
            </label>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="bg-gray-50 border text-xl border-black border-opacity-50 h-[400px] text-gray-900 font-extrabold font-manrope py-2.5 px-4 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="text-black bg-gray-51 border border-black border-opacity-50 font-bold font-manrope hover:bg-black hover:text-white-A700 ml-[520px] focus:ring-1 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg transform transition-transform duration-150 ease-in-out hover:-translate-y-1"
          >
            {preview ? "Edit" : "Preview"}
          </button>

          <button
            type="submit"
            className="text-black bg-gray-51 border border-black border-opacity-50 font-bold font-manrope hover:bg-black hover:text-white-A700 focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg transform transition-transform duration-150 ease-in-out hover:-translate-y-1"
          >
            Update Blog Post
          </button>

          {preview && (
            <div className="mt-8 p-4 border rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-3">{title}</h2>
              <div className="mb-3">
                {tags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
          )}
        </form>
      </div>
      <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
    </div>
  );
};

export default EditBlog;
