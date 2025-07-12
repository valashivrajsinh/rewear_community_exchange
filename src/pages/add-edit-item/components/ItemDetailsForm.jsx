import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ItemDetailsForm = ({ formData, onFormChange, errors }) => {
  const categoryOptions = [
    { value: 'tops', label: 'Tops & Shirts' },
    { value: 'bottoms', label: 'Bottoms & Pants' },
    { value: 'dresses', label: 'Dresses & Skirts' },
    { value: 'outerwear', label: 'Jackets & Coats' },
    { value: 'shoes', label: 'Shoes & Footwear' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'activewear', label: 'Activewear & Sports' },
    { value: 'formal', label: 'Formal & Business' },
    { value: 'casual', label: 'Casual & Everyday' },
    { value: 'vintage', label: 'Vintage & Retro' }
  ];

  const sizeOptions = [
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' },
    { value: '0', label: '0' },
    { value: '2', label: '2' },
    { value: '4', label: '4' },
    { value: '6', label: '6' },
    { value: '8', label: '8' },
    { value: '10', label: '10' },
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: '16', label: '16' },
    { value: 'one-size', label: 'One Size' }
  ];

  const conditionOptions = [
    { value: 'new', label: 'New with Tags', description: 'Brand new, never worn' },
    { value: 'like-new', label: 'Like New', description: 'Excellent condition, barely worn' },
    { value: 'good', label: 'Good', description: 'Minor signs of wear, well maintained' },
    { value: 'fair', label: 'Fair', description: 'Noticeable wear but still functional' },
    { value: 'poor', label: 'Poor', description: 'Significant wear, may need repairs' }
  ];

  const brandOptions = [
    { value: 'nike', label: 'Nike' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'zara', label: 'Zara' },
    { value: 'h&m', label: 'H&M' },
    { value: 'uniqlo', label: 'Uniqlo' },
    { value: 'gap', label: 'Gap' },
    { value: 'levi', label: "Levi\'s" },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg">Basic Information</h3>
        
        <Input
          label="Item Title"
          type="text"
          placeholder="e.g., Vintage Denim Jacket - Medium"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          error={errors.title}
          required
          maxLength={100}
          description="Be specific and descriptive"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Category"
            options={categoryOptions}
            value={formData.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors.category}
            required
            searchable
          />

          <Select
            label="Brand"
            options={brandOptions}
            value={formData.brand}
            onChange={(value) => handleInputChange('brand', value)}
            error={errors.brand}
            searchable
            clearable
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Size"
            options={sizeOptions}
            value={formData.size}
            onChange={(value) => handleInputChange('size', value)}
            error={errors.size}
            required
          />

          <Select
            label="Condition"
            options={conditionOptions}
            value={formData.condition}
            onChange={(value) => handleInputChange('condition', value)}
            error={errors.condition}
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg">Description</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Item Description *
          </label>
          <textarea
            placeholder={`Describe your item in detail...\n\n• Material and fabric\n• Fit and style\n• Any flaws or wear\n• Why you're swapping it`}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full h-32 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            maxLength={1000}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Be honest about condition and fit</span>
            <span>{formData.description.length}/1000</span>
          </div>
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description}</p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg">Tags & Keywords</h3>
        
        <Input
          label="Tags"
          type="text"
          placeholder="vintage, casual, summer, boho (separate with commas)"
          value={formData.tags}
          onChange={(e) => handleInputChange('tags', e.target.value)}
          description="Add keywords to help others find your item"
        />

        <div className="flex flex-wrap gap-2">
          {['vintage', 'casual', 'formal', 'summer', 'winter', 'boho', 'minimalist', 'trendy'].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                const currentTags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
                if (!currentTags.includes(tag)) {
                  handleInputChange('tags', [...currentTags, tag].join(', '));
                }
              }}
              className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Swap Preferences */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg">Swap Preferences</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Estimated Value (Points)"
            type="number"
            placeholder="150"
            value={formData.pointValue}
            onChange={(e) => handleInputChange('pointValue', e.target.value)}
            description="Suggested based on category and condition"
            min="10"
            max="1000"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Looking For
            </label>
            <textarea
              placeholder="What would you like in exchange? Be specific about sizes, styles, or categories you're interested in."
              value={formData.lookingFor}
              onChange={(e) => handleInputChange('lookingFor', e.target.value)}
              className="w-full h-20 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
              maxLength={200}
            />
            <span className="text-xs text-muted-foreground">{formData.lookingFor.length}/200</span>
          </div>
        </div>
      </div>

      {/* Availability Options */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg">Availability</h3>
        
        <div className="space-y-3">
          <Checkbox
            label="Available for immediate swap"
            description="Others can request this item right away"
            checked={formData.availableNow}
            onChange={(e) => handleInputChange('availableNow', e.target.checked)}
          />
          
          <Checkbox
            label="Open to point redemption"
            description="Allow users to redeem this item with points"
            checked={formData.allowPoints}
            onChange={(e) => handleInputChange('allowPoints', e.target.checked)}
          />
          
          <Checkbox
            label="Local pickup preferred"
            description="Prefer meeting in person over shipping"
            checked={formData.localPickup}
            onChange={(e) => handleInputChange('localPickup', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsForm;