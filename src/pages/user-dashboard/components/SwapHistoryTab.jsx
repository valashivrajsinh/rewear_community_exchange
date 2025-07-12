import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SwapHistoryTab = ({ history }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        label: 'Completed',
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20',
        icon: 'CheckCircle'
      },
      cancelled: {
        label: 'Cancelled',
        color: 'text-error',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        icon: 'XCircle'
      },
      expired: {
        label: 'Expired',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        borderColor: 'border-border',
        icon: 'Clock'
      }
    };
    return configs[status] || configs.completed;
  };

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.status === filter);

  const handleRateSwap = (swapId) => {
    console.log('Rate swap:', swapId);
  };

  const handleViewDetails = (swapId) => {
    navigate(`/swap-management?id=${swapId}&view=history`);
  };

  const handleSwapAgain = (itemId) => {
    navigate(`/item-detail?id=${itemId}`);
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'completed', 'cancelled', 'expired'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
              filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {status === 'all' ? 'All History' : getStatusConfig(status).label}
            <span className="ml-2 text-xs">
              ({status === 'all' ? history.length : history.filter(item => item.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="History" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-2">
            No swap history
          </h3>
          <p className="text-muted-foreground mb-4">
            {filter === 'all' ? "You haven't completed any swaps yet." 
              : `No ${filter} swaps found.`}
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/browse-items')}
            iconName="Search"
            iconPosition="left"
          >
            Start Your First Swap
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((swap) => {
            const status = getStatusConfig(swap.status);
            
            return (
              <div
                key={swap.id}
                className="bg-card border border-border rounded-lg p-4 shadow-soft"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${status.color} ${status.bgColor} border ${status.borderColor}`}>
                    <Icon name={status.icon} size={14} />
                    <span>{status.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {swap.completedAt}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Your Item */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-medium text-sm text-foreground">
                      You Gave
                    </h4>
                    <div className="flex space-x-3">
                      <Image
                        src={swap.yourItem.image}
                        alt={swap.yourItem.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm text-foreground line-clamp-1">
                          {swap.yourItem.title}
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          {swap.yourItem.category} • Size {swap.yourItem.size}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Icon name="Coins" size={12} color="var(--color-success)" />
                          <span className="text-xs font-mono text-success">
                            +{swap.yourItem.points} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Their Item */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-medium text-sm text-foreground">
                      You Received
                    </h4>
                    <div className="flex space-x-3">
                      <Image
                        src={swap.theirItem.image}
                        alt={swap.theirItem.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm text-foreground line-clamp-1">
                          {swap.theirItem.title}
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          {swap.theirItem.category} • Size {swap.theirItem.size}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Icon name="Coins" size={12} color="var(--color-success)" />
                          <span className="text-xs font-mono text-success">
                            -{swap.theirItem.points} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4 p-3 bg-muted rounded-lg">
                  <Image
                    src={swap.otherUser.avatar}
                    alt={swap.otherUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-sm text-foreground">
                      {swap.otherUser.name}
                    </h5>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} color="var(--color-warning)" className="fill-current" />
                        <span className="text-xs text-muted-foreground">
                          {swap.otherUser.rating}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {swap.totalSwaps} swaps
                      </span>
                    </div>
                  </div>
                  
                  {/* Rating Display */}
                  {swap.yourRating && (
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground">Your rating:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            color={i < swap.yourRating ? "var(--color-warning)" : "var(--color-muted-foreground)"}
                            className={i < swap.yourRating ? "fill-current" : ""}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(swap.id)}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View Details
                  </Button>
                  
                  <div className="flex space-x-2">
                    {swap.status === 'completed' && !swap.yourRating && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRateSwap(swap.id)}
                        iconName="Star"
                        iconPosition="left"
                      >
                        Rate Swap
                      </Button>
                    )}
                    
                    {swap.status === 'completed' && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleSwapAgain(swap.theirItem.id)}
                        iconName="Repeat"
                        iconPosition="left"
                      >
                        Swap Again
                      </Button>
                    )}
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

export default SwapHistoryTab;