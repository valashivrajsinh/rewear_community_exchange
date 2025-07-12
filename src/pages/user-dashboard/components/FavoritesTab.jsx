import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FavoritesTab = ({ favorites }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const statusConfig = {
    available: {
      label: 'Available',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    unavailable: {
      label: 'Unavailable',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    },
    swapped: {
      label: 'Swapped',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-border'
    }
  };

  const filteredFavorites = filter === 'all' 
    ? favorites 
    : favorites.filter(item => item.status === filter);

  const handleRemoveFavorite = (itemId) => {
    console.log('Remove from favorites:', itemId);
  };

  const handleViewItem = (itemId) => {
    navigate(`/item-detail?id=${itemId}`);
  };

  const handleSwapRequest = (itemId) => {
    navigate(`/item-detail?id=${itemId}&action=swap`);
  };

  const handleMessageOwner = (ownerId) => {
    console.log('Message owner:', ownerId);
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'available', 'unavailable', 'swapped'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {status === 'all' ? 'All Favorites' : statusConfig[status]?.label}
            <span className="ml-2 text-xs">
              ({status === 'all' ? favorites.length : favorites.filter(item => item.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* Favorites Grid */}
      {filteredFavorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-2">
            No favorites found
          </h3>
          <p className="text-muted-foreground mb-4">
            {filter === 'all' ? "You haven't saved any items to your favorites yet." 
              : `No ${filter} favorites found.`}
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/browse-items')}
            iconName="Search"
            iconPosition="left"
          >
            Browse Items
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFavorites.map((item) => {
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
                  <button
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
                  >
                    <Icon name="Heart" size={16} color="var(--color-error)" className="fill-current" />
                  </button>
                  {item.status === 'available' && item.newUpdate && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs font-medium">
                      Price Updated
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
                  
                  {/* Owner Info */}
                  <div className="flex items-center space-x-2 mb-3 p-2 bg-muted rounded-lg">
                    <Image
                      src={item.owner.avatar}
                      alt={item.owner.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {item.owner.name}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={10} color="var(--color-warning)" className="fill-current" />
                        <span className="text-xs text-muted-foreground">
                          {item.owner.rating}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMessageOwner(item.owner.id)}
                      className="w-6 h-6"
                    >
                      <Icon name="MessageCircle" size={12} />
                    </Button>
                  </div>
                  
                  {/* Points and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Icon name="Coins" size={14} color="var(--color-success)" />
                      <span className="font-mono text-sm font-medium text-success">
                        {item.points} pts
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewItem(item.id)}
                        className="w-8 h-8"
                      >
                        <Icon name="Eye" size={14} />
                      </Button>
                      {item.status === 'available' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleSwapRequest(item.id)}
                          iconName="ArrowLeftRight"
                          iconPosition="left"
                          className="text-xs px-2 py-1 h-8"
                        >
                          Swap
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Saved Date */}
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Saved on {item.savedAt}
                    </p>
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

export default FavoritesTab;