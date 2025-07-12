import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ item, onSwapRequest, onRedeemPoints, onFavorite, isFavorited }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleSwapRequest = async () => {
    setIsRequesting(true);
    try {
      await onSwapRequest();
    } finally {
      setIsRequesting(false);
    }
  };

  const handleRedeem = async () => {
    setIsRedeeming(true);
    try {
      await onRedeemPoints();
    } finally {
      setIsRedeeming(false);
    }
  };

  const isAvailable = item.status === 'available';
  const isPending = item.status === 'pending';

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="grid grid-cols-1 gap-3">
        {/* Swap Request Button */}
        <Button
          variant={isAvailable ? "default" : "outline"}
          disabled={!isAvailable || isRequesting}
          loading={isRequesting}
          onClick={handleSwapRequest}
          iconName="ArrowLeftRight"
          iconPosition="left"
          className="w-full"
        >
          {isPending ? 'Swap Pending' : 'Request Swap'}
        </Button>

        {/* Redeem with Points Button */}
        <Button
          variant="secondary"
          disabled={!isAvailable || isRedeeming}
          loading={isRedeeming}
          onClick={handleRedeem}
          iconName="Coins"
          iconPosition="left"
          className="w-full"
        >
          Redeem for {item.points} Points
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-3 gap-2">
        {/* Favorite Button */}
        <Button
          variant="outline"
          onClick={onFavorite}
          iconName={isFavorited ? "Heart" : "Heart"}
          className={`${isFavorited ? 'text-error border-error' : ''}`}
        >
          <Icon 
            name="Heart" 
            size={18} 
            className={isFavorited ? 'fill-current' : ''} 
          />
        </Button>

        {/* Share Button */}
        <Button
          variant="outline"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: item.title,
                text: `Check out this ${item.category} on ReWear Community`,
                url: window.location.href
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          iconName="Share"
        >
          <Icon name="Share" size={18} />
        </Button>

        {/* Message Button */}
        <Button
          variant="outline"
          onClick={() => console.log('Open message')}
          iconName="MessageCircle"
        >
          <Icon name="MessageCircle" size={18} />
        </Button>
      </div>

      {/* Status Information */}
      {!isAvailable && (
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">
              {isPending ? 'Swap request pending approval' : 'Item not available'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;