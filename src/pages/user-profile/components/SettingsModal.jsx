import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsModal = ({ user, onClose }) => {
  const [privacy, setPrivacy] = useState(user?.privacy || {});
  const [notifications, setNotifications] = useState({
    swapRequests: true,
    messages: true,
    reviews: true,
    marketing: false
  });

  const handlePrivacyChange = (setting, value) => {
    setPrivacy(prev => ({ ...prev, [setting]: value }));
  };

  const handleNotificationChange = (setting, value) => {
    setNotifications(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', { privacy, notifications });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-background rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Settings
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
          {/* Privacy Settings */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Show email</p>
                  <p className="text-xs text-muted-foreground">Make your email visible to other users</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.showEmail ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    privacy.showEmail ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Show location</p>
                  <p className="text-xs text-muted-foreground">Display your city and state</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('showLocation', !privacy.showLocation)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.showLocation ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    privacy.showLocation ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Show activity</p>
                  <p className="text-xs text-muted-foreground">Let others see your recent activity</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('showActivity', !privacy.showActivity)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.showActivity ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    privacy.showActivity ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Allow messages</p>
                  <p className="text-xs text-muted-foreground">Receive direct messages from other users</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('allowMessages', !privacy.allowMessages)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.allowMessages ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    privacy.allowMessages ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Swap requests</p>
                  <p className="text-xs text-muted-foreground">Get notified about new swap requests</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('swapRequests', !notifications.swapRequests)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.swapRequests ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.swapRequests ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Messages</p>
                  <p className="text-xs text-muted-foreground">Notifications for new messages</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('messages', !notifications.messages)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.messages ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.messages ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Reviews</p>
                  <p className="text-xs text-muted-foreground">Get notified when you receive reviews</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('reviews', !notifications.reviews)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.reviews ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.reviews ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Account</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                fullWidth
                iconName="Download"
                iconPosition="left"
              >
                Download My Data
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="HelpCircle"
                iconPosition="left"
              >
                Help & Support
              </Button>
              <Button
                variant="destructive"
                fullWidth
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-border">
          <Button
            variant="ghost"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            fullWidth
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;