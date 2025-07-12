import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onEdit, onSettings, onShare }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft">
      {/* Cover Photo */}
      <div className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20">
        {user?.coverPhoto ? (
          <Image
            src={user.coverPhoto}
            alt="Cover photo"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20" />
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShare}
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <Icon name="Share2" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettings}
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <Icon name="Settings" size={18} />
          </Button>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex justify-between items-start -mt-12">
          <div className="relative">
            <div className="relative group">
              <Image
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-soft"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center cursor-pointer">
                <Icon name="Camera" size={20} color="white" />
              </div>
            </div>
            
            {/* Verification Badge */}
            {user?.verified && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full border-2 border-background flex items-center justify-center">
                <Icon name="Check" size={14} color="white" />
              </div>
            )}
          </div>
          
          {/* Edit Profile Button */}
          <Button
            variant="outline"
            onClick={onEdit}
            className="mt-6"
            iconName="Edit2"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        </div>
        
        {/* User Info */}
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <h1 className="font-heading font-bold text-2xl text-foreground">
              {user?.name}
            </h1>
            {user?.verified && (
              <Icon name="BadgeCheck" size={20} color="var(--color-success)" />
            )}
          </div>
          
          <p className="text-muted-foreground font-medium">
            {user?.username}
          </p>
          
          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{user?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>Member since {user?.memberSince}</span>
            </div>
          </div>
        </div>
        
        {/* Bio */}
        {user?.bio && (
          <p className="mt-4 text-foreground leading-relaxed">
            {user.bio}
          </p>
        )}
        
        {/* Rating & Points */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    color={i < Math.floor(user?.rating || 0) ? "var(--color-warning)" : "var(--color-muted-foreground)"}
                    className={i < Math.floor(user?.rating || 0) ? "fill-current" : ""}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">
                {user?.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({user?.reviewCount} reviews)
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-success/10 px-3 py-1 rounded-full">
            <Icon name="Coins" size={16} color="var(--color-success)" />
            <span className="font-mono text-sm font-semibold text-success">
              {user?.points?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;