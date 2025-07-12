import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SwapHistory = ({ swaps }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  const getSwapTypeIcon = (type) => {
    const icons = {
      'swap': 'ArrowLeftRight',
      'points': 'Coins',
      'gift': 'Gift'
    };
    return icons[type] || 'ArrowLeftRight';
  };

  const getSwapTypeColor = (type) => {
    const colors = {
      'swap': 'text-primary',
      'points': 'text-success',
      'gift': 'text-accent'
    };
    return colors[type] || 'text-primary';
  };

  return (
    <div className="bg-background">
      <h3 className="font-heading font-medium text-lg text-foreground mb-4">
        Swap History ({swaps.length})
      </h3>

      {swaps.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="History" size={48} className="text-muted mx-auto mb-3" />
          <p className="text-muted-foreground">No swap history</p>
          <p className="text-sm text-muted-foreground">This item hasn't been swapped before</p>
        </div>
      ) : (
        <div className="space-y-4">
          {swaps.map((swap) => (
            <div key={swap.id} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
              {/* Swap Type Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center ${getSwapTypeColor(swap.type)}`}>
                <Icon name={getSwapTypeIcon(swap.type)} size={20} />
              </div>

              {/* Swap Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-medium text-sm text-foreground">
                    {swap.type === 'swap' ? 'Item Swap' : 
                     swap.type === 'points' ? 'Points Redemption' : 'Gift Exchange'}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(swap.date)}
                  </span>
                </div>

                {/* Participants */}
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={swap.fromUser.avatar}
                      alt={swap.fromUser.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-foreground">{swap.fromUser.name}</span>
                  </div>
                  
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                  
                  <div className="flex items-center space-x-2">
                    <Image
                      src={swap.toUser.avatar}
                      alt={swap.toUser.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-foreground">{swap.toUser.name}</span>
                  </div>
                </div>

                {/* Swap Details */}
                <div className="text-sm text-muted-foreground">
                  {swap.type === 'swap' && (
                    <p>Swapped for: {swap.exchangedItem}</p>
                  )}
                  {swap.type === 'points' && (
                    <p>Redeemed for {swap.pointsUsed} points</p>
                  )}
                  {swap.type === 'gift' && (
                    <p>Given as a gift</p>
                  )}
                </div>

                {/* Rating */}
                {swap.rating && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <Icon
                          key={index}
                          name="Star"
                          size={12}
                          className={index < swap.rating ? 'text-warning fill-current' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {swap.rating}/5 rating
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwapHistory;