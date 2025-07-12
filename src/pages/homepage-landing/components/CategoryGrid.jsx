import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategoryGrid = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Tops & Shirts",
      icon: "Shirt",
      count: 12847,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "T-shirts, blouses, sweaters"
    },
    {
      id: 2,
      name: "Dresses",
      icon: "Crown",
      count: 8934,
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Casual, formal, party dresses"
    },
    {
      id: 3,
      name: "Bottoms",
      icon: "Scissors",
      count: 9876,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Jeans, pants, skirts, shorts"
    },
    {
      id: 4,
      name: "Outerwear",
      icon: "Coat",
      count: 5432,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Jackets, coats, blazers"
    },
    {
      id: 5,
      name: "Shoes",
      icon: "Footprints",
      count: 7654,
      color: "text-warning",
      bgColor: "bg-warning/10",
      description: "Sneakers, heels, boots, flats"
    },
    {
      id: 6,
      name: "Accessories",
      icon: "Watch",
      count: 4321,
      color: "text-error",
      bgColor: "bg-error/10",
      description: "Bags, jewelry, watches, belts"
    },
    {
      id: 7,
      name: "Activewear",
      icon: "Zap",
      count: 3456,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Gym wear, yoga, sports clothing"
    },
    {
      id: 8,
      name: "Vintage",
      icon: "Clock",
      count: 2987,
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Retro, classic, antique pieces"
    }
  ];

  const trendingCategories = [
    { name: "Summer Dresses", trend: "+45%" },
    { name: "Denim Jackets", trend: "+32%" },
    { name: "Sneakers", trend: "+28%" },
    { name: "Vintage Tees", trend: "+25%" }
  ];

  const handleCategoryClick = (category) => {
    navigate('/browse-items', { 
      state: { 
        selectedCategory: category.name,
        categoryId: category.id 
      } 
    });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing clothing items across all categories. From everyday essentials to special occasion pieces.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="bg-card rounded-xl border border-border p-6 shadow-soft hover:shadow-soft-hover transition-all duration-300 group text-left"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={category.icon} size={24} className={category.color} />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-foreground">
                    {category.count.toLocaleString()} items
                  </span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Trending Section */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                Trending Now
              </h3>
              <p className="text-muted-foreground">
                Most popular categories this week
              </p>
            </div>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="TrendingUp" size={20} />
              <span className="font-medium text-sm">Hot</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingCategories.map((item, index) => (
              <div
                key={index}
                className="bg-muted/50 rounded-lg p-4 text-center hover:bg-muted transition-colors duration-300"
              >
                <p className="font-medium text-foreground mb-1">
                  {item.name}
                </p>
                <div className="flex items-center justify-center space-x-1 text-success">
                  <Icon name="TrendingUp" size={14} />
                  <span className="text-sm font-medium">{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-8 bg-background rounded-full px-8 py-4 shadow-soft">
            <div className="text-center">
              <div className="font-heading text-xl font-bold text-primary">50K+</div>
              <div className="text-xs text-muted-foreground">Total Items</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="font-heading text-xl font-bold text-accent">8</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="font-heading text-xl font-bold text-success">24/7</div>
              <div className="text-xs text-muted-foreground">New Listings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;