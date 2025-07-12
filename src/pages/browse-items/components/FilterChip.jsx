import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChip = ({ label, onRemove, isActive = true }) => {
  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted text-muted-foreground'
    }`}>
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${label} filter`}
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  );
};

export default FilterChip;