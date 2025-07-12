import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageGallery = ({ images, itemTitle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="relative bg-muted">
      {/* Main Image Display */}
      <div className="relative aspect-square lg:aspect-[4/3] overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={`${itemTitle} - Image ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 cursor-pointer ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={toggleZoom}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-sm font-mono">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleZoom}
            className="bg-black/50 text-white hover:bg-black/70 w-8 h-8"
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} />
          </Button>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 p-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImageIndex
                  ? 'border-primary' :'border-transparent hover:border-border'
              }`}
            >
              <Image
                src={image}
                alt={`${itemTitle} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;