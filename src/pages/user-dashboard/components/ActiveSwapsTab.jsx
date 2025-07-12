import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveSwapsTab = ({ swaps }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'Pending Response',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20'
      },
      accepted: {
        label: 'Accepted',
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20'
      },
      in_progress: {
        label: 'In Progress',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20'
      },
      awaiting_pickup: {
        label: 'Awaiting Pickup',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        borderColor: 'border-accent/20'
      }
    };
    return configs[status] || configs.pending;
  };

  const handleAcceptSwap = (swapId) => {
    console.log('Accept swap:', swapId);
  };

  const handleDeclineSwap = (swapId) => {
    console.log('Decline swap:', swapId);
  };

  const handleMessageUser = (userId) => {
    console.log('Message user:', userId);
  };

  const handleViewSwapDetails = (swapId) => {
    navigate(`/swap-management?id=${swapId}`);
  };

  if (swaps.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ArrowLeftRight" size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="font-heading font-medium text-lg text-foreground mb-2">
          No active swaps
        </h3>
        <p className="text-muted-foreground mb-4">
          You don't have any ongoing swap requests at the moment.
        </p>
        <Button
          variant="default"
          onClick={() => navigate('/browse-items')}
          iconName="Search"
          iconPosition="left"
        >
          Browse Items to Swap
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {swaps.map((swap) => {
        const status = getStatusConfig(swap.status);
        
        return (
          <div
            key={swap.id}
            className="bg-card border border-border rounded-lg p-4 shadow-soft"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${status.color} ${status.bgColor} border ${status.borderColor}`}>
                {status.label}
              </div>
              <span className="text-xs text-muted-foreground">
                {swap.createdAt}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Your Item */}
              <div className="space-y-3">
                <h4 className="font-heading font-medium text-sm text-foreground">
                  Your Item
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
                        {swap.yourItem.points} pts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Their Item */}
              <div className="space-y-3">
                <h4 className="font-heading font-medium text-sm text-foreground">
                  Their Item
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
                        {swap.theirItem.points} pts
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
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                    <span className="text-xs text-muted-foreground">
                      {swap.otherUser.location}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleMessageUser(swap.otherUser.id)}
                className="w-8 h-8"
              >
                <Icon name="MessageCircle" size={16} />
              </Button>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewSwapDetails(swap.id)}
                iconName="Eye"
                iconPosition="left"
              >
                View Details
              </Button>
              
              {swap.status === 'pending' && swap.type === 'incoming' && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeclineSwap(swap.id)}
                    iconName="X"
                    iconPosition="left"
                  >
                    Decline
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleAcceptSwap(swap.id)}
                    iconName="Check"
                    iconPosition="left"
                  >
                    Accept
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveSwapsTab;