import React from 'react';
import ItemCard from './ItemCard';
import Icon from '../../../components/AppIcon';


const ItemGrid = ({ items, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="aspect-square bg-muted animate-shimmer" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-muted rounded animate-shimmer" />
              <div className="h-3 bg-muted rounded w-2/3 animate-shimmer" />
              <div className="h-3 bg-muted rounded w-1/2 animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="font-heading font-medium text-lg text-foreground mb-2">
          No items found
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Try adjusting your filters or search terms to find more items.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemGrid;