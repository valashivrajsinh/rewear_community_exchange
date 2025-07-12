import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'points-low', label: 'Points: Low to High', icon: 'ArrowUp' },
    { value: 'points-high', label: 'Points: High to Low', icon: 'ArrowDown' },
    { value: 'distance', label: 'Nearest First', icon: 'MapPin' }
  ];

  const currentOption = sortOptions.find(option => option.value === value) || sortOptions[0];

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <Icon name={currentOption.icon} size={16} />
        <span className="text-sm font-medium">{currentOption.label}</span>
        <Icon name="ChevronDown" size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-soft z-20">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  value === option.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span className="text-sm">{option.label}</span>
                {value === option.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;