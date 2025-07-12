import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'tops', label: 'Tops & Shirts', count: 234 },
    { id: 'bottoms', label: 'Pants & Jeans', count: 189 },
    { id: 'dresses', label: 'Dresses', count: 156 },
    { id: 'outerwear', label: 'Jackets & Coats', count: 98 },
    { id: 'shoes', label: 'Shoes', count: 167 },
    { id: 'accessories', label: 'Accessories', count: 89 }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = [
    { id: 'new', label: 'Like New', description: 'Barely worn, excellent condition' },
    { id: 'good', label: 'Good', description: 'Minor signs of wear' },
    { id: 'fair', label: 'Fair', description: 'Noticeable wear but functional' }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked 
      ? [...localFilters.categories, categoryId]
      : localFilters.categories.filter(id => id !== categoryId);
    
    setLocalFilters(prev => ({ ...prev, categories: newCategories }));
  };

  const handleSizeChange = (size, checked) => {
    const newSizes = checked 
      ? [...localFilters.sizes, size]
      : localFilters.sizes.filter(s => s !== size);
    
    setLocalFilters(prev => ({ ...prev, sizes: newSizes }));
  };

  const handleConditionChange = (conditionId, checked) => {
    const newConditions = checked 
      ? [...localFilters.conditions, conditionId]
      : localFilters.conditions.filter(id => id !== conditionId);
    
    setLocalFilters(prev => ({ ...prev, conditions: newConditions }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      categories: [],
      sizes: [],
      conditions: [],
      pointRange: [0, 500],
      distance: 25
    };
    setLocalFilters(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-500 lg:hidden">
      <div className="absolute inset-x-0 bottom-0 bg-background rounded-t-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-semibold text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-heading font-medium text-base mb-3">Categories</h3>
            <div className="space-y-3">
              {categories.map(category => (
                <div key={category.id} className="flex items-center justify-between">
                  <Checkbox
                    label={category.label}
                    checked={localFilters.categories.includes(category.id)}
                    onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                  />
                  <span className="text-sm text-muted-foreground">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-heading font-medium text-base mb-3">Sizes</h3>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size, !localFilters.sizes.includes(size))}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    localFilters.sizes.includes(size)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:bg-muted'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="font-heading font-medium text-base mb-3">Condition</h3>
            <div className="space-y-3">
              {conditions.map(condition => (
                <div key={condition.id}>
                  <Checkbox
                    label={condition.label}
                    description={condition.description}
                    checked={localFilters.conditions.includes(condition.id)}
                    onChange={(e) => handleConditionChange(condition.id, e.target.checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Point Range */}
          <div>
            <h3 className="font-heading font-medium text-base mb-3">Points Required</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{localFilters.pointRange[0]} pts</span>
                <span>{localFilters.pointRange[1]} pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={localFilters.pointRange[1]}
                onChange={(e) => setLocalFilters(prev => ({ 
                  ...prev, 
                  pointRange: [0, parseInt(e.target.value)] 
                }))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Distance */}
          <div>
            <h3 className="font-heading font-medium text-base mb-3">Distance</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Within {localFilters.distance} miles</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={localFilters.distance}
                onChange={(e) => setLocalFilters(prev => ({ 
                  ...prev, 
                  distance: parseInt(e.target.value) 
                }))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClearAll} className="flex-1">
              Clear All
            </Button>
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;