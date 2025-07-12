import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ItemsTab = ({ items }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'swapped':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'pending':
        return 'Pending';
      case 'swapped':
        return 'Swapped';
      default:
        return status;
    }
  };

  const filteredItems = items?.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  }) || [];

  const filterOptions = [
    { id: 'all', label: 'All Items', count: items?.length || 0 },
    { id: 'available', label: 'Available', count: items?.filter(item => item.status === 'available').length || 0 },
    { id: 'pending', label: 'Pending', count: items?.filter(item => item.status === 'pending').length || 0 },
    { id: 'swapped', label: 'Swapped', count: items?.filter(item => item.status === 'swapped').length || 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === option.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-soft-hover transition-shadow"
            >
              {/* Item Image */}
              <div className="relative aspect-square">
                <Image
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.featured && (
                  <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </div>
              </div>

              {/* Item Info */}
              <div className="p-4">
                <h4 className="font-semibold text-foreground mb-1 line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{item.category} • Size {item.size}</span>
                  <span>{item.condition}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MoreHorizontal"
                    className="h-6 w-6 p-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center shadow-soft">
          <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground mb-2">No items found</h3>
          <p className="text-muted-foreground mb-4">
            {filter === 'all' ? "You haven't listed any items yet." 
              : `No ${filter} items found.`
            }
          </p>
          <Button
            variant="default"
            iconName="Plus"
          >
            Add New Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default ItemsTab;