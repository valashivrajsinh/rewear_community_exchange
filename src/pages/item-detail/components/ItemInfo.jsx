import React from 'react';
import Icon from '../../../components/AppIcon';

const ItemInfo = ({ item }) => {
  const getConditionColor = (condition) => {
    const colors = {
      'Excellent': 'text-success bg-success/10',
      'Very Good': 'text-success bg-success/10',
      'Good': 'text-warning bg-warning/10',
      'Fair': 'text-warning bg-warning/10',
      'Poor': 'text-error bg-error/10'
    };
    return colors[condition] || 'text-muted-foreground bg-muted';
  };

  const getConditionStars = (condition) => {
    const stars = {
      'Excellent': 5,
      'Very Good': 4,
      'Good': 3,
      'Fair': 2,
      'Poor': 1
    };
    return stars[condition] || 0;
  };

  return (
    <div className="space-y-6">
      {/* Title and Category */}
      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {item.title}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {item.category}
          </span>
          <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
            {item.type}
          </span>
        </div>
      </div>

      {/* Size and Condition */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-heading font-medium text-sm text-muted-foreground mb-1">
            Size
          </h3>
          <p className="font-heading text-lg font-semibold text-foreground">
            {item.size}
          </p>
        </div>
        <div>
          <h3 className="font-heading font-medium text-sm text-muted-foreground mb-1">
            Condition
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-lg text-sm font-medium ${getConditionColor(item.condition)}`}>
              {item.condition}
            </span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  name="Star"
                  size={14}
                  className={index < getConditionStars(item.condition) ? 'text-warning fill-current' : 'text-muted'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-heading font-medium text-lg text-foreground mb-3">
          Description
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Points and Availability */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Coins" size={20} color="var(--color-success)" />
          <span className="font-mono text-lg font-bold text-success">
            {item.points} points
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            item.status === 'available' ? 'bg-success' : 
            item.status === 'pending' ? 'bg-warning' : 'bg-muted'
          }`} />
          <span className={`font-medium text-sm capitalize ${
            item.status === 'available' ? 'text-success' : 
            item.status === 'pending' ? 'text-warning' : 'text-muted-foreground'
          }`}>
            {item.status}
          </span>
        </div>
      </div>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-background border border-border rounded-full text-sm text-foreground hover:bg-muted transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemInfo;