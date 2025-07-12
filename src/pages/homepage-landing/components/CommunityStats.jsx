import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = () => {
  const stats = [
    {
      id: 1,
      title: "Total Swaps",
      value: "52,847",
      change: "+12%",
      changeType: "increase",
      icon: "ArrowLeftRight",
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Successful exchanges this month"
    },
    {
      id: 2,
      title: "Active Members",
      value: "15,234",
      change: "+8%",
      changeType: "increase",
      icon: "Users",
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Community members online"
    },
    {
      id: 3,
      title: "CO₂ Saved",
      value: "2.5 Tons",
      change: "+15%",
      changeType: "increase",
      icon: "Leaf",
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Environmental impact this year"
    },
    {
      id: 4,
      title: "Items Listed",
      value: "89,156",
      change: "+23%",
      changeType: "increase",
      icon: "Package",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Available for exchange"
    }
  ];

  const achievements = [
    {
      title: "Sustainability Champion",
      description: "Prevented 500+ items from landfills",
      icon: "Award",
      color: "text-success"
    },
    {
      title: "Community Builder",
      description: "Connected 10K+ fashion lovers",
      icon: "Heart",
      color: "text-accent"
    },
    {
      title: "Circular Economy",
      description: "Promoted sustainable fashion practices",
      icon: "Recycle",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Community Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Together, we're building a more sustainable future through fashion sharing and community collaboration.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-card rounded-xl border border-border p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 group"
            >
              {/* Icon and Change */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon name={stat.icon} size={24} className={stat.color} />
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'increase' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                }`}>
                  <Icon 
                    name={stat.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                  />
                  <span>{stat.change}</span>
                </div>
              </div>

              {/* Value and Title */}
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </h3>
                <p className="font-medium text-foreground">
                  {stat.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
              Our Achievements
            </h3>
            <p className="text-muted-foreground">
              Milestones we've reached together as a community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center space-y-4 group"
              >
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name={achievement.icon} size={32} className={achievement.color} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              Live: 247 members actively swapping right now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;