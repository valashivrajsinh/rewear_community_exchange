import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityTab = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'swap_completed':
        return 'ArrowLeftRight';
      case 'item_listed':
        return 'Plus';
      case 'review_received':
        return 'Star';
      case 'profile_updated':
        return 'User';
      case 'item_favorited':
        return 'Heart';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'swap_completed':
        return 'text-success bg-success/10';
      case 'item_listed':
        return 'text-primary bg-primary/10';
      case 'review_received':
        return 'text-warning bg-warning/10';
      case 'profile_updated':
        return 'text-secondary bg-secondary/10';
      case 'item_favorited':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {activities && activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-card border border-border rounded-lg p-6 shadow-soft"
            >
              <div className="flex items-start space-x-4">
                {/* Activity Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={18} 
                  />
                </div>
                
                {/* Activity Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-foreground">
                      {activity.description}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                  
                  {/* Item Preview (if applicable) */}
                  {activity.item && (
                    <div className="flex items-center space-x-3 mt-3 p-3 bg-muted rounded-lg">
                      <Image
                        src={activity.item.image}
                        alt={activity.item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">
                          {activity.item.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center shadow-soft">
          <Icon name="Activity" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground mb-2">No activity yet</h3>
          <p className="text-muted-foreground">
            Your recent activity will appear here as you use the platform.
          </p>
        </div>
      )}
      
      {/* Load More Button */}
      {activities && activities.length > 0 && (
        <div className="text-center">
          <button className="text-primary hover:text-primary/80 font-medium text-sm">
            Load more activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityTab;