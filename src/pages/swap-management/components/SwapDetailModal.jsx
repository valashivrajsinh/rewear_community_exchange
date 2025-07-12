import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SwapDetailModal = ({ swap, isOpen, onClose, onAction }) => {
  const [message, setMessage] = useState('');
  const [counterOffer, setCounterOffer] = useState({
    points: swap?.pointsOffered || 0,
    message: ''
  });

  if (!isOpen || !swap) return null;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onAction(swap.id, 'message', { content: message });
      setMessage('');
    }
  };

  const handleCounterOffer = () => {
    onAction(swap.id, 'counter', counterOffer);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-300">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Swap Details
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={24} color="white" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-medium text-foreground">
                {swap.user.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="var(--color-warning)" />
                  <span>{swap.user.rating} rating</span>
                </div>
                <span>•</span>
                <span>{swap.user.swapCount} successful swaps</span>
                <span>•</span>
                <span>{swap.user.location}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
            >
              View Profile
            </Button>
          </div>

          {/* Swap Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Desired Item */}
            <div className="space-y-3">
              <h4 className="font-heading font-medium text-foreground">
                Requested Item
              </h4>
              <div className="border border-border rounded-lg p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-3">
                  <Image
                    src={swap.desiredItem.image}
                    alt={swap.desiredItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="font-medium text-foreground mb-1">
                  {swap.desiredItem.title}
                </h5>
                <p className="text-sm text-muted-foreground mb-2">
                  {swap.desiredItem.brand} • Size {swap.desiredItem.size}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                    {swap.desiredItem.condition}
                  </span>
                  <span className="text-sm font-mono text-primary">
                    {swap.desiredItem.points} pts
                  </span>
                </div>
              </div>
            </div>

            {/* Offered Item */}
            <div className="space-y-3">
              <h4 className="font-heading font-medium text-foreground">
                Offered in Exchange
              </h4>
              {swap.offeredItem ? (
                <div className="border border-border rounded-lg p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3">
                    <Image
                      src={swap.offeredItem.image}
                      alt={swap.offeredItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="font-medium text-foreground mb-1">
                    {swap.offeredItem.title}
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    {swap.offeredItem.brand} • Size {swap.offeredItem.size}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                      {swap.offeredItem.condition}
                    </span>
                    <span className="text-sm font-mono text-primary">
                      {swap.offeredItem.points} pts
                    </span>
                  </div>
                </div>
              ) : (
                <div className="border border-border rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Coins" size={32} color="white" />
                  </div>
                  <h5 className="font-medium text-success mb-1">
                    {swap.pointsOffered} Points
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Point redemption offer
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Message History */}
          {swap.messages && swap.messages.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-heading font-medium text-foreground">
                Message History
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {swap.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      msg.sender === 'You' ?'bg-primary text-primary-foreground ml-8' :'bg-muted text-foreground mr-8'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'You' ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {msg.sender} • {formatDate(msg.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Send Message */}
          <div className="space-y-3">
            <h4 className="font-heading font-medium text-foreground">
              Send Message
            </h4>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="primary"
                onClick={handleSendMessage}
                iconName="Send"
                disabled={!message.trim()}
              >
                Send
              </Button>
            </div>
          </div>

          {/* Counter Offer (for incoming requests) */}
          {swap.status === 'pending' && (
            <div className="space-y-3 p-4 bg-accent/10 rounded-lg">
              <h4 className="font-heading font-medium text-foreground">
                Make Counter Offer
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Points"
                  value={counterOffer.points}
                  onChange={(e) => setCounterOffer(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
                  min="0"
                />
                <Input
                  type="text"
                  label="Message"
                  placeholder="Explain your counter offer..."
                  value={counterOffer.message}
                  onChange={(e) => setCounterOffer(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>
              <Button
                variant="accent"
                onClick={handleCounterOffer}
                iconName="ArrowLeftRight"
                iconPosition="left"
                fullWidth
              >
                Send Counter Offer
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          
          {swap.status === 'pending' && (
            <>
              <Button
                variant="destructive"
                onClick={() => {
                  onAction(swap.id, 'decline');
                  onClose();
                }}
              >
                Decline
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  onAction(swap.id, 'accept');
                  onClose();
                }}
              >
                Accept Swap
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapDetailModal;