import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageUploadSection = ({ images, onImagesChange, maxImages = 8 }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const remainingSlots = maxImages - images.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file,
          preview: e.target.result,
          name: file.name
        };
        onImagesChange(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    onImagesChange(prev => prev.filter(img => img.id !== imageId));
  };

  const reorderImages = (fromIndex, toIndex) => {
    onImagesChange(prev => {
      const newImages = [...prev];
      const [removed] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, removed);
      return newImages;
    });
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    // Mock camera functionality
    console.log('Opening camera...');
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="text-center">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Upload" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading font-medium text-lg mb-2">
            Add Photos
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Drag and drop images here, or click to select files
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              variant="outline"
              onClick={openFileDialog}
              iconName="Image"
              iconPosition="left"
            >
              Choose Files
            </Button>
            <Button
              variant="outline"
              onClick={openCamera}
              iconName="Camera"
              iconPosition="left"
            >
              Take Photo
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {images.length}/{maxImages} photos • Max 5MB each
          </p>
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group aspect-square bg-muted rounded-lg overflow-hidden"
            >
              <Image
                src={image.preview}
                alt={`Upload preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Primary Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  Primary
                </div>
              )}
              
              {/* Remove Button */}
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="X" size={14} />
              </button>
              
              {/* Reorder Handles */}
              <div className="absolute bottom-2 left-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {index > 0 && (
                  <button
                    onClick={() => reorderImages(index, index - 1)}
                    className="w-6 h-6 bg-background/80 rounded flex items-center justify-center"
                  >
                    <Icon name="ChevronLeft" size={14} />
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    onClick={() => reorderImages(index, index + 1)}
                    className="w-6 h-6 bg-background/80 rounded flex items-center justify-center"
                  >
                    <Icon name="ChevronRight" size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Tips */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-heading font-medium text-sm mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
          Photo Tips
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Use natural lighting for best results</li>
          <li>• Show front, back, and any details or flaws</li>
          <li>• First photo will be your main listing image</li>
          <li>• Clear, high-quality photos get more interest</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploadSection;