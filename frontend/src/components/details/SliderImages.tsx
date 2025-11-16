import { ICONS } from "@/constants/icons";
import React, { memo, useState } from "react";

interface SliderImagesProps {
  images: [string];
}

const SliderImages: React.FC<SliderImagesProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleNextImage = () => {
    setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);
  };

  const handlePrevImage = () => {
    setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
  };

  return (
    <div className="sm:w-1/2 max-h-4/6 h-fit flex rounded-2xl overflow-hidden border border-amber-950 dark:border-gray-950">
      <div className="w-full max-h-4/6 h-full relative">
        <img
          className="w-full h-full object-cover"
          src={images[imageIndex]}
          alt={`image ${imageIndex}`}
        />

        <button
          onClick={handlePrevImage}
          className="opacity-30 h-full sm:w-8 w-6 rotate-180 absolute top-0 bottom-0 cursor-pointer p-1 hover:bg-amber-950/10 transition"
        >
          <img src={ICONS.sliderArrow} alt="arrow-left" />
        </button>
        <button
          onClick={handleNextImage}
          className="opacity-30 h-full sm:w-8 w-6 absolute top-0 bottom-0 right-0 cursor-pointer p-1 hover:bg-amber-950/10 transition"
        >
          <img src={ICONS.sliderArrow} alt="arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default memo(SliderImages);
