import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ currentStep, totalSteps, completedFields, totalFields }) => {
  const progressPercentage = (completedFields / totalFields) * 100;
  
  const steps = [
    { id: 1, label: 'Photos', icon: 'Camera' },
    { id: 2, label: 'Details', icon: 'FileText' },
    { id: 3, label: 'Preferences', icon: 'Settings' }
  ];

  return (
    <div className="bg-background border border-border rounded-lg p-4 mb-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Form Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {completedFields}/{totalFields} fields
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                isCompleted 
                  ? 'bg-success border-success text-white' 
                  : isCurrent 
                    ? 'bg-primary border-primary text-white' :'bg-background border-border text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <span className={`ml-2 text-sm font-medium hidden sm:block ${
                isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block w-8 h-0.5 mx-4 ${
                  isCompleted ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Status */}
      {progressPercentage === 100 && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center">
            <Icon name="CheckCircle" size={16} className="text-success mr-2" />
            <span className="text-sm font-medium text-success">
              Ready to publish! All required fields completed.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormProgress;