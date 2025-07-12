import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingActionButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Show FAB only on relevant screens
  const showOnPaths = ['/homepage-landing', '/browse-items', '/user-dashboard'];
  const shouldShow = showOnPaths.includes(location.pathname);

  if (!shouldShow) return null;

  const actions = [
    {
      label: 'Add Item',
      icon: 'Plus',
      action: () => {
        navigate('/add-edit-item');
        setIsExpanded(false);
      },
      color: 'bg-primary hover:bg-primary/90'
    },
    {
      label: 'Quick Swap',
      icon: 'ArrowLeftRight',
      action: () => {
        navigate('/swap-management');
        setIsExpanded(false);
      },
      color: 'bg-accent hover:bg-accent/90'
    },
    {
      label: 'Take Photo',
      icon: 'Camera',
      action: () => {
        console.log('Open camera');
        setIsExpanded(false);
      },
      color: 'bg-secondary hover:bg-secondary/90'
    }
  ];

  const handleMainAction = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-300">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-in">
          {actions.map((action, index) => (
            <div
              key={action.label}
              className="flex items-center space-x-3"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-background text-foreground px-3 py-1 rounded-lg shadow-soft text-sm font-medium whitespace-nowrap">
                {action.label}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={action.action}
                className={`w-12 h-12 rounded-full shadow-soft-hover ${action.color} text-white`}
              >
                <Icon name={action.icon} size={20} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Main FAB */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleMainAction}
        className={`w-14 h-14 rounded-full shadow-soft-hover transition-all duration-300 ${
          isExpanded 
            ? 'bg-muted text-foreground rotate-45' 
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        <Icon 
          name={isExpanded ? 'X' : 'Plus'} 
          size={24} 
          strokeWidth={2.5}
        />
      </Button>
    </div>
  );
};

export default FloatingActionButton;