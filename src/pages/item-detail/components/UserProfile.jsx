import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/user-dashboard');
  };

  const getRatingStars = (rating) => {
    return Math.round(rating);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <h3 className="font-heading font-medium text-lg text-foreground mb-4">
        Item Owner
      </h3>
      
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            src={user.avatar}
            alt={`${user.name}'s profile`}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-heading font-semibold text-foreground truncate">
              {user.name}
            </h4>
            {user.verified && (
              <Icon name="BadgeCheck" size={16} color="var(--color-primary)" />
            )}
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 mb-2">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {user.location} • {user.distance} away
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  name="Star"
                  size={14}
                  className={index < getRatingStars(user.rating) ? 'text-warning fill-current' : 'text-muted'}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {user.rating} ({user.reviewCount} reviews)
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-center">
              <p className="font-mono text-sm font-bold text-foreground">
                {user.itemsListed}
              </p>
              <p className="text-xs text-muted-foreground">Items</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-sm font-bold text-foreground">
                {user.successfulSwaps}
              </p>
              <p className="text-xs text-muted-foreground">Swaps</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-sm font-bold text-success">
                {user.points}
              </p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
          </div>

          {/* View Profile Button */}
          <Button
            variant="outline"
            onClick={handleViewProfile}
            className="w-full"
          >
            View Profile
          </Button>
        </div>
      </div>

      {/* Member Since */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Member since {user.memberSince}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;