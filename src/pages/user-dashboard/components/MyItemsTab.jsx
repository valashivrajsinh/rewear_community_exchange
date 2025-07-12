import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MyItemsTab = ({ items }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const statusConfig = {
    available: {
      label: 'Available',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    pending: {
      label: 'Pending',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    swapped: {
      label: 'Swapped',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-border'
    }
  };

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.status === filter);

  const handleEditItem = (itemId) => {
    navigate(`/add-edit-item?id=${itemId}`);
  };

  const handleViewDetails = (itemId) => {
    navigate(`/item-detail?id=${itemId}`);
  };

  const handleRemoveItem = (itemId) => {
    console.log('Remove item:', itemId);
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'available', 'pending', 'swapped'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {status === 'all' ? 'All Items' : statusConfig[status]?.label}
            <span className="ml-2 text-xs">
              ({status === 'all' ? items.length : items.filter(item => item.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Package" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-2">
            No items found
          </h3>
          <p className="text-muted-foreground mb-4">
            {filter === 'all' ? "You haven't listed any items yet." 
              : `No ${filter} items found.`}
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/add-edit-item')}
            iconName="Plus"
            iconPosition="left"
          >
            Add Your First Item
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const status = statusConfig[item.status];
            
            return (
              <div
                key={item.id}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-soft-hover transition-shadow duration-200"
              >
                <div className="relative">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium ${status.color} ${status.bgColor} border ${status.borderColor}`}>
                    {status.label}
                  </div>
                  {item.featured && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="Star" size={12} color="white" className="fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-heading font-medium text-base text-foreground mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{item.category}</span>
                    <span>Size {item.size}</span>
                    <span>{item.condition}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-xs text-muted-foreground">{item.views}</span>
                      <Icon name="Heart" size={14} color="var(--color-muted-foreground)" className="ml-2" />
                      <span className="text-xs text-muted-foreground">{item.likes}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(item.id)}
                        className="w-8 h-8"
                      >
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditItem(item.id)}
                        className="w-8 h-8"
                      >
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="w-8 h-8 text-error hover:text-error"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyItemsTab;