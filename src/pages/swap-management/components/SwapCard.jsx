import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SwapCard = ({ swap, type, onAction }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/10 text-warning border-warning/20',
      accepted: 'bg-success/10 text-success border-success/20',
      declined: 'bg-error/10 text-error border-error/20',
      countered: 'bg-accent/10 text-accent border-accent/20',
      in_progress: 'bg-primary/10 text-primary border-primary/20',
      completed: 'bg-muted text-muted-foreground border-border',
      shipped: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors[status] || 'bg-muted text-muted-foreground border-border';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const renderActionButtons = () => {
    if (type === 'incoming' && swap.status === 'pending') {
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction(swap.id, 'decline')}
            className="flex-1"
          >
            Decline
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAction(swap.id, 'counter')}
            className="flex-1"
          >
            Counter
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => onAction(swap.id, 'accept')}
            className="flex-1"
          >
            Accept
          </Button>
        </div>
      );
    }

    if (type === 'outgoing' && swap.status === 'pending') {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction(swap.id, 'cancel')}
          fullWidth
        >
          Cancel Request
        </Button>
      );
    }

    if (type === 'progress') {
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            onClick={() => onAction(swap.id, 'message')}
            className="flex-1"
          >
            Message
          </Button>
          {swap.status === 'accepted' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAction(swap.id, 'ship')}
              className="flex-1"
            >
              Mark Shipped
            </Button>
          )}
        </div>
      );
    }

    if (type === 'completed' && !swap.rated) {
      return (
        <Button
          variant="outline"
          size="sm"
          iconName="Star"
          onClick={() => onAction(swap.id, 'rate')}
          fullWidth
        >
          Rate Experience
        </Button>
      );
    }

    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4 hover:shadow-soft transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-heading font-medium text-sm text-foreground">
              {swap.user.name}
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} color="var(--color-warning)" />
                <span className="text-xs text-muted-foreground">{swap.user.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{swap.user.swapCount} swaps</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(swap.status)}`}>
            {swap.status.replace('_', ' ')}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTimeAgo(swap.timestamp)}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {/* Desired Item */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            {type === 'incoming' ? 'Wants your item:' : 'You want:'}
          </p>
          <div className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src={swap.desiredItem.image}
                alt={swap.desiredItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">
                {swap.desiredItem.title}
              </p>
              <p className="text-xs text-muted-foreground">
                Size {swap.desiredItem.size} • {swap.desiredItem.condition}
              </p>
            </div>
          </div>
        </div>

        {/* Offered Item or Points */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            {type === 'incoming' ? 'Offering:' : 'You offered:'}
          </p>
          {swap.offeredItem ? (
            <div className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={swap.offeredItem.image}
                  alt={swap.offeredItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">
                  {swap.offeredItem.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  Size {swap.offeredItem.size} • {swap.offeredItem.condition}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 p-2 bg-success/10 rounded-lg">
              <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                <Icon name="Coins" size={20} color="white" />
              </div>
              <div>
                <p className="font-medium text-sm text-success">
                  {swap.pointsOffered} Points
                </p>
                <p className="text-xs text-success/80">Point redemption</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Preview */}
      {swap.lastMessage && (
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="MessageCircle" size={14} className="text-muted-foreground mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground line-clamp-2">
                "{swap.lastMessage.content}"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatTimeAgo(swap.lastMessage.timestamp)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Tracking for In Progress */}
      {type === 'progress' && swap.progress && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">Progress</span>
            <span className="text-xs text-primary">{swap.progress.step}/4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(swap.progress.step / 4) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{swap.progress.currentStep}</p>
        </div>
      )}

      {/* Action Buttons */}
      {renderActionButtons()}
    </div>
  );
};

export default SwapCard;