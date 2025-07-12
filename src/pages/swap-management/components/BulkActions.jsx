import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActions = ({ selectedItems, onBulkAction, onSelectAll, onClearSelection, totalItems }) => {
  const [showActions, setShowActions] = useState(false);

  if (selectedItems.length === 0) return null;

  const isAllSelected = selectedItems.length === totalItems;

  const bulkActionOptions = [
    {
      id: 'accept',
      label: 'Accept Selected',
      icon: 'Check',
      variant: 'success',
      description: 'Accept all selected incoming requests'
    },
    {
      id: 'decline',
      label: 'Decline Selected',
      icon: 'X',
      variant: 'destructive',
      description: 'Decline all selected incoming requests'
    },
    {
      id: 'message',
      label: 'Send Message',
      icon: 'MessageCircle',
      variant: 'outline',
      description: 'Send a message to selected users'
    },
    {
      id: 'archive',
      label: 'Archive Selected',
      icon: 'Archive',
      variant: 'outline',
      description: 'Move selected items to archive'
    }
  ];

  return (
    <div className="fixed bottom-20 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-background border border-border rounded-lg shadow-soft-hover z-200">
      <div className="p-4">
        {/* Selection Summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={isAllSelected}
              indeterminate={selectedItems.length > 0 && !isAllSelected}
              onChange={isAllSelected ? onClearSelection : onSelectAll}
            />
            <span className="font-medium text-sm text-foreground">
              {selectedItems.length} of {totalItems} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
          >
            Clear
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="success"
            size="sm"
            onClick={() => onBulkAction('accept', selectedItems)}
            iconName="Check"
            iconPosition="left"
          >
            Accept All
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onBulkAction('decline', selectedItems)}
            iconName="X"
            iconPosition="left"
          >
            Decline All
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowActions(!showActions)}
            iconName="MoreHorizontal"
          >
            More Actions
          </Button>
        </div>

        {/* Expanded Actions */}
        {showActions && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-border">
            {bulkActionOptions.slice(2).map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                size="sm"
                onClick={() => onBulkAction(action.id, selectedItems)}
                iconName={action.icon}
                iconPosition="left"
                className="justify-start"
              >
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs opacity-80">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActions;