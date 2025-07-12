import React from 'react';

import { Checkbox } from '../../../components/ui/Checkbox';

const DesktopFilters = ({ filters, onFiltersChange }) => {
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
    { id: 'new', label: 'Like New' },
    { id: 'good', label: 'Good' },
    { id: 'fair', label: 'Fair' }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked 
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleSizeChange = (size, checked) => {
    const newSizes = checked 
      ? [...filters.sizes, size]
      : filters.sizes.filter(s => s !== size);
    
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handleConditionChange = (conditionId, checked) => {
    const newConditions = checked 
      ? [...filters.conditions, conditionId]
      : filters.conditions.filter(id => id !== conditionId);
    
    onFiltersChange({ ...filters, conditions: newConditions });
  };

  const handleClearAll = () => {
    onFiltersChange({
      categories: [],
      sizes: [],
      conditions: [],
      pointRange: [0, 500],
      distance: 25
    });
  };

  return (
    <div className="w-64 bg-background border-r border-border p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg">Filters</h2>
        <button
          onClick={handleClearAll}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-heading font-medium text-base mb-3">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category.id} className="flex items-center justify-between">
              <Checkbox
                label={category.label}
                checked={filters.categories.includes(category.id)}
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
              onClick={() => handleSizeChange(size, !filters.sizes.includes(size))}
              className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                filters.sizes.includes(size)
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
            <Checkbox
              key={condition.id}
              label={condition.label}
              checked={filters.conditions.includes(condition.id)}
              onChange={(e) => handleConditionChange(condition.id, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Point Range */}
      <div>
        <h3 className="font-heading font-medium text-base mb-3">Points Required</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.pointRange[0]} pts</span>
            <span>{filters.pointRange[1]} pts</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            value={filters.pointRange[1]}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              pointRange: [0, parseInt(e.target.value)] 
            })}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Distance */}
      <div>
        <h3 className="font-heading font-medium text-base mb-3">Distance</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Within {filters.distance} miles</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={filters.distance}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              distance: parseInt(e.target.value) 
            })}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-heading font-medium text-sm text-muted-foreground mb-2">
          Browse Stats
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Total items</span>
            <span className="font-mono text-xs font-medium">1,247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">New today</span>
            <span className="font-mono text-xs font-medium text-success">23</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Avg points</span>
            <span className="font-mono text-xs font-medium">85</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopFilters;