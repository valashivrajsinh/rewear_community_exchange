import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Browse Items", action: () => navigate('/browse-items') },
        { label: "Add Item", action: () => navigate('/add-edit-item') },
        { label: "My Dashboard", action: () => navigate('/user-dashboard') },
        { label: "Swap Management", action: () => navigate('/swap-management') }
      ]
    },
    {
      title: "Community",
      links: [
        { label: "Community Guidelines", action: () => console.log('Guidelines') },
        { label: "Safety Tips", action: () => console.log('Safety') },
        { label: "Success Stories", action: () => console.log('Stories') },
        { label: "Member Spotlight", action: () => console.log('Spotlight') }
      ]
    },
    {
      title: "Sustainability",
      links: [
        { label: "Environmental Impact", action: () => console.log('Impact') },
        { label: "Circular Fashion", action: () => console.log('Circular') },
        { label: "Eco Tips", action: () => console.log('Tips') },
        { label: "Carbon Footprint", action: () => console.log('Carbon') }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", action: () => console.log('Help') },
        { label: "Contact Us", action: () => console.log('Contact') },
        { label: "Report Issue", action: () => console.log('Report') },
        { label: "Feedback", action: () => console.log('Feedback') }
      ]
    }
  ];

  const socialLinks = [
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Youtube", icon: "Youtube", url: "#" },
    { name: "LinkedIn", icon: "Linkedin", url: "#" }
  ];

  const sustainabilityTips = [
    "Choose quality over quantity when shopping",
    "Repair and upcycle before replacing",
    "Share and swap to extend clothing lifecycle",
    "Support sustainable fashion brands"
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-2">
                Stay Updated
              </h3>
              <p className="text-background/80">
                Get the latest sustainability tips, featured items, and community updates delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-background/10 border border-background/20 text-background placeholder-background/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Recycle" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl">ReWear</span>
            </div>
            <p className="text-background/80 mb-6 max-w-sm">
              Building a sustainable future through community-driven fashion sharing. Join thousands of eco-conscious individuals making a difference.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold text-lg mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-background/80 hover:text-background transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sustainability Tips */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <h4 className="font-heading font-semibold text-lg mb-4 text-center">
            💚 Sustainability Tips
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sustainabilityTips.map((tip, index) => (
              <div
                key={index}
                className="bg-background/5 rounded-lg p-4 text-center"
              >
                <p className="text-sm text-background/80">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-8 pt-8 border-t border-background/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="font-heading text-2xl font-bold text-primary mb-1">
                52,847
              </div>
              <div className="text-sm text-background/80">Items Exchanged</div>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-accent mb-1">
                15,234
              </div>
              <div className="text-sm text-background/80">Active Members</div>
            </div>
            <div>
              <div className="font-heading text-2xl font-bold text-success mb-1">
                2.5 Tons
              </div>
              <div className="text-sm text-background/80">CO₂ Prevented</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-background/80">
                © {currentYear} ReWear Community. All rights reserved.
              </p>
              <div className="flex space-x-4 text-sm">
                <button className="text-background/80 hover:text-background transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="text-background/80 hover:text-background transition-colors duration-300">
                  Terms of Service
                </button>
                <button className="text-background/80 hover:text-background transition-colors duration-300">
                  Cookie Policy
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-background/80">
              <Icon name="Shield" size={16} />
              <span>SSL Secured Platform</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;