import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SimilarItems = ({ items, title = "Similar Items" }) => {
  const navigate = useNavigate();

  const handleItemClick = (itemId) => {
    navigate(`/item-detail?id=${itemId}`);
  };

  const getStatusColor = (status) => {
    const colors = {
      'available': 'bg-success',
      'pending': 'bg-warning',
      'swapped': 'bg-muted'
    };
    return colors[status] || 'bg-muted';
  };

  return (
    <div className="bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-lg text-foreground">
          {title}
        </h3>
        <button 
          onClick={() => navigate('/browse-items')}
          className="text-primary text-sm font-medium hover:underline"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-soft-hover transition-shadow"
          >
            {/* Item Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
              </div>

              {/* Points Badge */}
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-lg">
                <div className="flex items-center space-x-1">
                  <Icon name="Coins" size={12} />
                  <span className="font-mono text-xs">{item.points}</span>
                </div>
              </div>
            </div>

            {/* Item Info */}
            <div className="p-3">
              <h4 className="font-heading font-medium text-sm text-foreground truncate mb-1">
                {item.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {item.category} • {item.size}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.distance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;