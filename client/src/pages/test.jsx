import React, { useState } from 'react';

const ImageUploadPreview = () => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    
    const filePreviews = selectedFiles.map(file => {
      return URL.createObjectURL(file);
    });
    setPreviewUrls(filePreviews);
  };

  return (
    <div className="container mx-auto p-8">
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        className="file:mr-5 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />
      <div className='flex flex-wrap gap-4 mt-4'>
        {previewUrls.map((url, index) => (
          <img key={index} src={url} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover rounded-lg shadow-md" />
        ))}
      </div>
    </div>
  );
};

export default ImageUploadPreview;
