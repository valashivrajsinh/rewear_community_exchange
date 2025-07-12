import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import ImageUploadSection from './components/ImageUploadSection';
import ItemDetailsForm from './components/ItemDetailsForm';
import FormProgress from './components/FormProgress';
import LocationSelector from './components/LocationSelector';
import ActionButtons from './components/ActionButtons';
import AppIcon from '../../components/AppIcon';

const AddEditItem = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const itemId = searchParams.get('id');

  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Mock user location
  const userLocation = {
    address: "456 Oak Avenue, San Francisco, CA 94103",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    lat: 37.7849,
    lng: -122.4094
  };

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    brand: '',
    size: '',
    condition: '',
    description: '',
    tags: '',
    pointValue: '',
    lookingFor: '',
    availableNow: true,
    allowPoints: true,
    localPickup: false,
    location: userLocation
  });

  // Load existing item data if editing
  useEffect(() => {
    if (isEditing && itemId) {
      // Mock loading existing item data
      const mockItemData = {
        title: "Vintage Denim Jacket",
        category: "outerwear",
        brand: "levi",
        size: "m",
        condition: "good",
        description: "Classic Levi\'s denim jacket in excellent condition. Perfect for layering in spring and fall. Shows minimal wear with authentic vintage character.",
        tags: "vintage, denim, casual, spring",
        pointValue: "180",
        lookingFor: "Looking for similar size tops, sweaters, or casual dresses",
        availableNow: true,
        allowPoints: true,
        localPickup: true,
        location: userLocation
      };

      const mockImages = [
        {
          id: 1,
          preview: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
          name: "front-view.jpg"
        },
        {
          id: 2,
          preview: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400",
          name: "back-view.jpg"
        }
      ];

      setFormData(mockItemData);
      setImages(mockImages);
    }
  }, [isEditing, itemId]);

  // Auto-save functionality
  useEffect(() => {
    if (hasChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleSaveDraft(true); // Silent auto-save
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [formData, images, hasChanges]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.size) newErrors.size = 'Size is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (images.length === 0) newErrors.images = 'At least one photo is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate form completion
  const getFormCompletion = () => {
    const requiredFields = ['title', 'category', 'size', 'condition', 'description'];
    const completedFields = requiredFields.filter(field => formData[field]?.trim()).length + (images.length > 0 ? 1 : 0);
    const totalFields = requiredFields.length + 1; // +1 for images
    
    return { completedFields, totalFields };
  };

  const handleFormChange = (newData) => {
    setFormData(newData);
    setHasChanges(true);
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    setHasChanges(true);
  };

  const handleSaveDraft = async (silent = false) => {
    setIsSaving(true);
    setIsDraft(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!silent) {
        // Show success message
        console.log('Draft saved successfully');
      }
      
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsSaving(false);
      setIsDraft(false);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setIsDraft(false);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to item detail page
      navigate('/item-detail?id=123&published=true');
    } catch (error) {
      console.error('Failed to publish item:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/user-dashboard');
  };

  const { completedFields, totalFields } = getFormCompletion();
  const isValid = validateForm() && images.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-6">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <AppIcon name={isEditing ? "Edit" : "Plus"} size={24} className="text-primary" />
              <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                {isEditing ? 'Edit Item' : 'Add New Item'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {isEditing 
                ? 'Update your item details and photos' :'Share your clothing with the ReWear community'
              }
            </p>
          </div>

          {/* Form Progress */}
          <FormProgress
            currentStep={currentStep}
            totalSteps={3}
            completedFields={completedFields}
            totalFields={totalFields}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-semibold text-xl mb-4 flex items-center">
                  <AppIcon name="Camera" size={20} className="mr-2 text-primary" />
                  Photos
                </h2>
                <ImageUploadSection
                  images={images}
                  onImagesChange={handleImagesChange}
                  maxImages={8}
                />
                {errors.images && (
                  <p className="text-sm text-destructive mt-2">{errors.images}</p>
                )}
              </div>

              {/* Location Section - Desktop */}
              <div className="hidden lg:block">
                <h2 className="font-heading font-semibold text-xl mb-4 flex items-center">
                  <AppIcon name="MapPin" size={20} className="mr-2 text-primary" />
                  Location
                </h2>
                <LocationSelector
                  formData={formData}
                  onFormChange={handleFormChange}
                  userLocation={userLocation}
                />
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-semibold text-xl mb-4 flex items-center">
                  <AppIcon name="FileText" size={20} className="mr-2 text-primary" />
                  Item Details
                </h2>
                <ItemDetailsForm
                  formData={formData}
                  onFormChange={handleFormChange}
                  errors={errors}
                />
              </div>

              {/* Location Section - Mobile */}
              <div className="lg:hidden">
                <h2 className="font-heading font-semibold text-xl mb-4 flex items-center">
                  <AppIcon name="MapPin" size={20} className="mr-2 text-primary" />
                  Location
                </h2>
                <LocationSelector
                  formData={formData}
                  onFormChange={handleFormChange}
                  userLocation={userLocation}
                />
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-heading font-semibold text-lg mb-3 flex items-center text-primary">
              <AppIcon name="Lightbulb" size={20} className="mr-2" />
              Tips for Better Swaps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p>• Use natural lighting for photos</p>
                <p>• Show any flaws or wear honestly</p>
                <p>• Include measurements when helpful</p>
              </div>
              <div className="space-y-2">
                <p>• Write detailed, honest descriptions</p>
                <p>• Respond quickly to swap requests</p>
                <p>• Be specific about what you're seeking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons
          onSave={handleSave}
          onSaveDraft={handleSaveDraft}
          onCancel={handleCancel}
          isValid={isValid}
          isSaving={isSaving}
          isDraft={isDraft}
          hasChanges={hasChanges}
        />
      </main>

      <BottomTabNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default AddEditItem;