import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ 
  onSave, 
  onSaveDraft, 
  onCancel, 
  isValid, 
  isSaving, 
  isDraft,
  hasChanges 
}) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (hasChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!confirmLeave) return;
    }
    
    if (onCancel) {
      onCancel();
    } else {
      navigate('/user-dashboard');
    }
  };

  const handleSaveDraft = () => {
    onSaveDraft();
  };

  const handlePublish = () => {
    if (isValid) {
      onSave();
    }
  };

  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center justify-between p-6 bg-background border-t border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            onClick={handleCancel}
            iconName="X"
            iconPosition="left"
          >
            Cancel
          </Button>
          
          {hasChanges && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              Unsaved changes
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            loading={isSaving && isDraft}
            iconName="Save"
            iconPosition="left"
          >
            Save Draft
          </Button>
          
          <Button
            variant="default"
            onClick={handlePublish}
            loading={isSaving && !isDraft}
            disabled={!isValid}
            iconName="Upload"
            iconPosition="left"
          >
            {isValid ? 'Publish Item' : 'Complete Required Fields'}
          </Button>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-100">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            loading={isSaving && isDraft}
            iconName="Save"
            className="flex-1"
          >
            Draft
          </Button>
          
          <Button
            variant="default"
            onClick={handlePublish}
            loading={isSaving && !isDraft}
            disabled={!isValid}
            iconName="Upload"
            className="flex-2"
          >
            {isValid ? 'Publish' : 'Complete Form'}
          </Button>
        </div>
        
        {hasChanges && (
          <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
            <Icon name="AlertCircle" size={12} className="mr-1" />
            Unsaved changes
          </div>
        )}
      </div>
    </>
  );
};

export default ActionButtons;