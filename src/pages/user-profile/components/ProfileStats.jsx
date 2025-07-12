import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileStats = ({ stats }) => {
  const statItems = [
    {
      id: 'swaps',
      label: 'Total Swaps',
      value: stats?.totalSwaps || 0,
      icon: 'ArrowLeftRight',
      color: 'text-primary'
    },
    {
      id: 'items',
      label: 'Items Listed',
      value: stats?.itemsListed || 0,
      icon: 'Package',
      color: 'text-secondary'
    },
    {
      id: 'rating',
      label: 'Community Rating',
      value: stats?.communityRating || 0,
      icon: 'Star',
      color: 'text-warning',
      suffix: '/5'
    },
    {
      id: 'impact',
      label: 'Sustainability Impact',
      value: stats?.sustainabilityImpact || '0 items saved',
      icon: 'Leaf',
      color: 'text-success',
      isText: true
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <div
          key={stat.id}
          className="bg-card border border-border rounded-lg p-4 text-center shadow-soft hover:shadow-soft-hover transition-shadow"
        >
          <div className={`w-12 h-12 rounded-full bg-${stat.color.replace('text-', '')}/10 flex items-center justify-center mx-auto mb-3`}>
            <Icon 
              name={stat.icon} 
              size={20} 
              className={stat.color}
            />
          </div>
          
          <div className="space-y-1">
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.isText ? stat.value.split(' ')[0] : stat.value}
              {stat.suffix && stat.suffix}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              {stat.isText ? stat.value.split(' ').slice(1).join(' ') : stat.label}
            </p>
            {stat.isText && (
              <p className="text-xs text-muted-foreground">
                {stat.label}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;