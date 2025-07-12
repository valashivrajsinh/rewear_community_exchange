import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const LocationSelector = ({ formData, onFormChange, userLocation }) => {
  const [useCustomLocation, setUseCustomLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleLocationChange = (field, value) => {
    onFormChange(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const useCurrentLocation = () => {
    // Mock getting current location
    const mockLocation = {
      address: "123 Main Street, San Francisco, CA 94102",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      lat: 37.7749,
      lng: -122.4194
    };
    
    onFormChange(prev => ({
      ...prev,
      location: mockLocation
    }));
    setUseCustomLocation(false);
  };

  const useProfileLocation = () => {
    onFormChange(prev => ({
      ...prev,
      location: userLocation
    }));
    setUseCustomLocation(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg">Item Location</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMap(!showMap)}
          iconName={showMap ? "EyeOff" : "Eye"}
          iconPosition="left"
        >
          {showMap ? "Hide" : "Show"} Map
        </Button>
      </div>

      {/* Location Options */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={useProfileLocation}
            iconName="User"
            iconPosition="left"
            className="flex-1"
          >
            Use Profile Location
          </Button>
          <Button
            variant="outline"
            onClick={useCurrentLocation}
            iconName="MapPin"
            iconPosition="left"
            className="flex-1"
          >
            Use Current Location
          </Button>
        </div>

        <Checkbox
          label="Use custom location for this item"
          description="Override your profile location for this specific item"
          checked={useCustomLocation}
          onChange={(e) => setUseCustomLocation(e.target.checked)}
        />
      </div>

      {/* Custom Location Form */}
      {useCustomLocation && (
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <Input
            label="Street Address"
            type="text"
            placeholder="123 Main Street"
            value={formData.location?.address || ''}
            onChange={(e) => handleLocationChange('address', e.target.value)}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="City"
              type="text"
              placeholder="San Francisco"
              value={formData.location?.city || ''}
              onChange={(e) => handleLocationChange('city', e.target.value)}
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="State"
                type="text"
                placeholder="CA"
                value={formData.location?.state || ''}
                onChange={(e) => handleLocationChange('state', e.target.value)}
              />
              
              <Input
                label="ZIP Code"
                type="text"
                placeholder="94102"
                value={formData.location?.zipCode || ''}
                onChange={(e) => handleLocationChange('zipCode', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Current Location Display */}
      {formData.location && (
        <div className="p-4 bg-background border border-border rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {formData.location.address || 'Address not specified'}
              </p>
              <p className="text-sm text-muted-foreground">
                {formData.location.city}, {formData.location.state} {formData.location.zipCode}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Map Display */}
      {showMap && formData.location?.lat && formData.location?.lng && (
        <div className="h-64 bg-muted rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Item Location"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${formData.location.lat},${formData.location.lng}&z=14&output=embed`}
            className="border-0"
          />
        </div>
      )}

      {/* Privacy Notice */}
      <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-warning mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-warning mb-1">Privacy Notice</p>
            <p className="text-muted-foreground">
              Your exact address won't be shared. Only the general area will be visible to other users for safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;