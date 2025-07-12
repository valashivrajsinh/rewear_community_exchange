import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartSwapping = () => {
    navigate('/add-edit-item');
  };

  const handleBrowseItems = () => {
    navigate('/browse-items');
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Swap, Share,{' '}
                <span className="text-primary">Sustain</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
                Join our community of eco-conscious fashion lovers. Exchange clothes, earn points, and make sustainable fashion accessible for everyone.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-center">
              <div>
                <div className="font-heading text-2xl font-bold text-primary">15K+</div>
                <div className="text-sm text-muted-foreground">Happy Members</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-accent">50K+</div>
                <div className="text-sm text-muted-foreground">Items Swapped</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-success">2.5T</div>
                <div className="text-sm text-muted-foreground">CO₂ Saved</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                onClick={handleStartSwapping}
                iconName="Plus"
                iconPosition="left"
                className="min-w-48"
              >
                Start Swapping
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleBrowseItems}
                iconName="Search"
                iconPosition="left"
                className="min-w-48"
              >
                Browse Items
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span>Verified Community</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span>Safe Exchanges</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop"
                alt="Sustainable fashion community members exchanging clothes"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-soft-hover"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-background p-4 rounded-xl shadow-soft border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SJ</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sarah just swapped</p>
                    <p className="text-xs text-muted-foreground">Vintage Denim Jacket</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-background p-4 rounded-xl shadow-soft border border-border">
                <div className="text-center">
                  <div className="font-heading text-xl font-bold text-success">+250</div>
                  <div className="text-xs text-muted-foreground">Points Earned</div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;