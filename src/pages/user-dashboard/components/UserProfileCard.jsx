import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Image
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
            <Icon name="Check" size={12} color="white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            {user.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            Member since {user.memberSince}
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">{user.location}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-1 bg-success/10 px-3 py-1 rounded-full">
            <Icon name="Coins" size={16} color="var(--color-success)" />
            <span className="font-mono text-lg font-semibold text-success">
              {user.points.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">ReWear Points</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                color={i < user.rating ? "var(--color-warning)" : "var(--color-muted-foreground)"}
                className={i < user.rating ? "fill-current" : ""}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">
            {user.rating}.0
          </span>
          <span className="text-sm text-muted-foreground">
            ({user.reviewCount} reviews)
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} color="var(--color-success)" />
          <span className="text-sm font-medium text-success">Verified</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;