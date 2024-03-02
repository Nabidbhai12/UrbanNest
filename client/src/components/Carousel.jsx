import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const Carousel = ({ images, autoSlide = true, autoSlideInterval = 3000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative flex items-center justify-center rounded-md">
      <div className="overflow-hidden w-full max-w-screen-lg">
        <div
          className="whitespace-nowrap transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="inline-block w-full h-auto rounded-md"
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prevSlide}
          className="p-1 rounded-full shadow bg-white-A700/80 text-gray-800 hover:bg-white-A700"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={nextSlide}
          className="p-1 rounded-full shadow bg-white-A700/80 text-gray-800 hover:bg-white-A700"
        >
          <ChevronRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <div
              className={`
              transition-all w-3 h-3 bg-white-A700 rounded-full
              ${currentSlide === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;