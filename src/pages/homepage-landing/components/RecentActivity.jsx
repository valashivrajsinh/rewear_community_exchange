import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const navigate = useNavigate();

  const recentActivities = [
    {
      id: 1,
      type: "swap_completed",
      user: {
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        location: "Brooklyn, NY"
      },
      item: {
        title: "Vintage Leather Jacket",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop"
      },
      timestamp: "2 minutes ago",
      points: 450
    },
    {
      id: 2,
      type: "new_member",
      user: {
        name: "Alex Chen",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        location: "San Francisco, CA"
      },
      timestamp: "5 minutes ago",
      joinedItems: 3
    },
    {
      id: 3,
      type: "item_listed",
      user: {
        name: "Sofia Martinez",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        location: "Los Angeles, CA"
      },
      item: {
        title: "Designer Summer Dress",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop"
      },
      timestamp: "12 minutes ago",
      category: "Dresses"
    },
    {
      id: 4,
      type: "swap_completed",
      user: {
        name: "Michael Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        location: "Chicago, IL"
      },
      item: {
        title: "Classic Denim Jeans",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop"
      },
      timestamp: "18 minutes ago",
      points: 280
    },
    {
      id: 5,
      type: "milestone",
      user: {
        name: "Rachel Green",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        location: "Miami, FL"
      },
      timestamp: "25 minutes ago",
      milestone: "50th swap",
      badge: "Sustainability Champion"
    },
    {
      id: 6,
      type: "item_listed",
      user: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        location: "Seattle, WA"
      },
      item: {
        title: "Wool Winter Coat",
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop"
      },
      timestamp: "32 minutes ago",
      category: "Outerwear"
    }
  ];

  const newMembers = [
    {
      name: "Jessica Park",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      location: "Portland, OR",
      joinedDate: "Today",
      interests: ["Vintage", "Sustainable"]
    },
    {
      name: "Ryan Thompson",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      location: "Austin, TX",
      joinedDate: "Yesterday",
      interests: ["Streetwear", "Designer"]
    },
    {
      name: "Maya Patel",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      location: "Boston, MA",
      joinedDate: "2 days ago",
      interests: ["Casual", "Eco-friendly"]
    },
    {
      name: "Chris Johnson",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      location: "Denver, CO",
      joinedDate: "3 days ago",
      interests: ["Outdoor", "Minimalist"]
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'swap_completed':
        return { name: 'ArrowLeftRight', color: 'text-success' };
      case 'new_member':
        return { name: 'UserPlus', color: 'text-primary' };
      case 'item_listed':
        return { name: 'Plus', color: 'text-accent' };
      case 'milestone':
        return { name: 'Award', color: 'text-warning' };
      default:
        return { name: 'Activity', color: 'text-muted-foreground' };
    }
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'swap_completed':
        return `swapped their ${activity.item.title}`;
      case 'new_member':
        return `joined the community with ${activity.joinedItems} items`;
      case 'item_listed':
        return `listed a new ${activity.item.title}`;
      case 'milestone':
        return `reached their ${activity.milestone} and earned "${activity.badge}" badge`;
      default:
        return 'had some activity';
    }
  };

  const handleViewProfile = (user) => {
    navigate('/user-dashboard', { state: { user } });
  };

  const handleViewItem = (item) => {
    navigate('/item-detail', { state: { item } });
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Recent Activity
              </h2>
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const iconInfo = getActivityIcon(activity.type);
                
                return (
                  <div
                    key={activity.id}
                    className="bg-card rounded-lg border border-border p-4 shadow-soft hover:shadow-soft-hover transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Activity Icon */}
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={iconInfo.name} size={18} className={iconInfo.color} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {/* User Info */}
                            <div className="flex items-center space-x-2 mb-2">
                              <button
                                onClick={() => handleViewProfile(activity.user)}
                                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                              >
                                <Image
                                  src={activity.user.avatar}
                                  alt={activity.user.name}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="font-medium text-sm text-foreground">
                                  {activity.user.name}
                                </span>
                              </button>
                              <span className="text-xs text-muted-foreground">
                                from {activity.user.location}
                              </span>
                            </div>

                            {/* Activity Description */}
                            <p className="text-sm text-muted-foreground mb-2">
                              {getActivityText(activity)}
                            </p>

                            {/* Additional Info */}
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>{activity.timestamp}</span>
                              {activity.points && (
                                <div className="flex items-center space-x-1 text-success">
                                  <Icon name="Coins" size={12} />
                                  <span>+{activity.points} points</span>
                                </div>
                              )}
                              {activity.category && (
                                <span className="bg-muted px-2 py-1 rounded-full">
                                  {activity.category}
                                </span>
                              )}
                              {activity.badge && (
                                <span className="bg-warning/10 text-warning px-2 py-1 rounded-full">
                                  {activity.badge}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Item Image */}
                          {activity.item && (
                            <button
                              onClick={() => handleViewItem(activity.item)}
                              className="ml-4 flex-shrink-0 hover:opacity-80 transition-opacity"
                            >
                              <Image
                                src={activity.item.image}
                                alt={activity.item.title}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-6">
              <Button variant="outline">
                Load More Activity
              </Button>
            </div>
          </div>

          {/* New Members Sidebar */}
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-6">
              New Members
            </h3>

            <div className="space-y-4">
              {newMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg border border-border p-4 shadow-soft hover:shadow-soft-hover transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {member.location}
                      </p>
                    </div>
                    <span className="text-xs text-success font-medium">
                      {member.joinedDate}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {member.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Welcome Message */}
            <div className="mt-6 bg-primary/10 rounded-lg p-4 text-center">
              <Icon name="Heart" size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm text-primary font-medium mb-1">
                Welcome to our community!
              </p>
              <p className="text-xs text-muted-foreground">
                Join {newMembers.length}+ new members this week
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;