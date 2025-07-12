import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(item.isFavorited || false);

  const handleCardClick = () => {
    navigate('/item-detail', { state: { item } });
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleQuickSwap = (e) => {
    e.stopPropagation();
    console.log('Quick swap request for:', item.title);
  };

  const getStatusBadge = () => {
    if (item.status === 'urgent') {
      return (
        <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
          Urgent Swap
        </div>
      );
    }
    if (item.status === 'new') {
      return (
        <div className="absolute top-2 left-2 bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
          New
        </div>
      );
    }
    return null;
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new': return 'text-success';
      case 'good': return 'text-warning';
      case 'fair': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div 
      className="bg-card rounded-lg border border-border overflow-hidden cursor-pointer hover:shadow-soft-hover transition-all duration-200 animate-scale-hover"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        
        {getStatusBadge()}
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={handleFavorite}
            className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Icon 
              name="Heart" 
              size={16} 
              color={isFavorited ? 'var(--color-accent)' : 'var(--color-muted-foreground)'}
              strokeWidth={isFavorited ? 0 : 2}
              fill={isFavorited ? 'var(--color-accent)' : 'none'}
            />
          </button>
        </div>

        {/* Bottom Quick Action */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleQuickSwap}
            className="w-8 h-8 bg-primary text-primary-foreground rounded-full"
          >
            <Icon name="ArrowLeftRight" size={14} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Title and Points */}
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 flex-1">
            {item.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Icon name="Coins" size={14} color="var(--color-success)" />
            <span className="font-mono text-sm font-medium text-success">
              {item.points}
            </span>
          </div>
        </div>

        {/* Size and Condition */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="bg-muted px-2 py-1 rounded text-muted-foreground font-medium">
              {item.size}
            </span>
            <span className={`font-medium ${getConditionColor(item.condition)}`}>
              {item.condition === 'new' ? 'Like New' : 
               item.condition === 'good' ? 'Good' : 'Fair'}
            </span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-2 pt-1">
          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={12} color="white" />
          </div>
          <span className="text-xs text-muted-foreground truncate">
            {item.owner}
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={10} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">
              {item.distance}mi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;