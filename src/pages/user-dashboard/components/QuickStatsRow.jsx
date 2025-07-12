import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsRow = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Swaps',
      value: stats.totalSwaps,
      icon: 'ArrowLeftRight',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Items Listed',
      value: stats.itemsListed,
      icon: 'Package',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Community Rating',
      value: `${stats.rating}/5`,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Points Earned',
      value: stats.pointsEarned.toLocaleString(),
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 shadow-soft"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
              <Icon name={item.icon} size={18} color={`var(--color-${item.color.split('-')[1]})`} />
            </div>
            <div>
              <p className="font-mono text-lg font-semibold text-foreground">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          </div>
          
          {/* Progress bar for rating */}
          {item.label === 'Community Rating' && (
            <div className="mt-3">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-warning h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.rating / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuickStatsRow;