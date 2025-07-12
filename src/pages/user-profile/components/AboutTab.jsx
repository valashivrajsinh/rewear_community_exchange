import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AboutTab = ({ user }) => {
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState(user?.bio || '');

  const handleSaveBio = () => {
    // Save bio logic here
    setEditingBio(false);
  };

  return (
    <div className="space-y-6">
      {/* Bio Section */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">About Me</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingBio(!editingBio)}
            iconName="Edit2"
          >
            {editingBio ? 'Cancel' : 'Edit'}
          </Button>
        </div>
        
        {editingBio ? (
          <div className="space-y-3">
            <textarea
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={4}
              placeholder="Tell us about yourself..."
            />
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveBio}
                iconName="Check"
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setBioText(user?.bio || '');
                  setEditingBio(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-foreground leading-relaxed">
            {user?.bio || 'No bio added yet.'}
          </p>
        )}
      </div>

      {/* Interests */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {user?.interests?.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {interest}
            </span>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="px-3 py-1 h-auto text-sm"
            iconName="Plus"
          >
            Add Interest
          </Button>
        </div>
      </div>

      {/* Preferred Categories */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Preferred Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          {user?.preferredCategories?.map((category, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-3 bg-muted rounded-lg"
            >
              <Icon name="Package" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Swap Preferences */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Swap Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">Willing to ship</span>
            </div>
            <span className={`text-sm font-medium ${user?.swapPreferences?.willingToShip ? 'text-success' : 'text-muted-foreground'}`}>
              {user?.swapPreferences?.willingToShip ? 'Yes' : 'No'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">Local meetups</span>
            </div>
            <span className={`text-sm font-medium ${user?.swapPreferences?.localMeetups ? 'text-success' : 'text-muted-foreground'}`}>
              {user?.swapPreferences?.localMeetups ? 'Yes' : 'No'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Radius" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">Preferred distance</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {user?.swapPreferences?.preferredDistance}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">Response time</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {user?.swapPreferences?.responseTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;