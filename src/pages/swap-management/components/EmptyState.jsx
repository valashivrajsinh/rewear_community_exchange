import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, onAction }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'incoming':
        return {
          icon: 'Inbox',
          title: 'No Incoming Requests',
          description: 'When someone wants to swap with your items, their requests will appear here.',
          actionText: 'Browse Items',
          actionIcon: 'Search'
        };
      case 'outgoing':
        return {
          icon: 'Send',
          title: 'No Outgoing Requests',
          description: 'Start browsing items and send swap requests to other users.',
          actionText: 'Browse Items',
          actionIcon: 'Search'
        };
      case 'progress':
        return {
          icon: 'ArrowLeftRight',
          title: 'No Active Swaps',
          description: 'Once you accept or send a swap request, active exchanges will appear here.',
          actionText: 'View Requests',
          actionIcon: 'Inbox'
        };
      case 'completed':
        return {
          icon: 'CheckCircle',
          title: 'No Completed Swaps',
          description: 'Your completed exchanges and swap history will be shown here.',
          actionText: 'Start Swapping',
          actionIcon: 'Plus'
        };
      default:
        return {
          icon: 'Package',
          title: 'No Swaps Found',
          description: 'No swaps match your current filters.',
          actionText: 'Clear Filters',
          actionIcon: 'X'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name={content.icon} size={32} className="text-muted-foreground" />
      </div>
      
      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
        {content.title}
      </h3>
      
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        {content.description}
      </p>
      
      <Button
        variant="outline"
        onClick={onAction}
        iconName={content.actionIcon}
        iconPosition="left"
      >
        {content.actionText}
      </Button>
    </div>
  );
};

export default EmptyState;