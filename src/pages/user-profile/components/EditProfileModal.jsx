import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EditProfileModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    bio: user?.bio || '',
    location: user?.location || '',
    interests: user?.interests?.join(', ') || '',
    preferredCategories: user?.preferredCategories || []
  });

  const [newInterest, setNewInterest] = useState('');

  const categories = [
    'Dresses', 'Tops', 'Bottoms', 'Jackets', 'Sweaters', 
    'Shoes', 'Accessories', 'Bags', 'Jewelry', 'Activewear'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      preferredCategories: prev.preferredCategories.includes(category)
        ? prev.preferredCategories.filter(c => c !== category)
        : [...prev.preferredCategories, category]
    }));
  };

  const handleSave = () => {
    // Save profile logic here
    console.log('Saving profile:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-background rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Edit Profile
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Photo */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Icon name="User" size={32} className="text-muted-foreground" />
              </div>
              <Button
                variant="default"
                size="icon"
                className="absolute -bottom-2 -right-2"
              >
                <Icon name="Camera" size={16} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click to update profile photo
            </p>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <Input
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Interests
            </label>
            <Input
              value={formData.interests}
              onChange={(e) => handleInputChange('interests', e.target.value)}
              placeholder="Vintage Fashion, Sustainable Living, etc."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate interests with commas
            </p>
          </div>

          {/* Preferred Categories */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Preferred Categories
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    formData.preferredCategories.includes(category)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-border">
          <Button
            variant="ghost"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            fullWidth
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;