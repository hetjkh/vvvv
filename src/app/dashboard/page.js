"use client"
import React, { useState } from 'react';
import {
  ProfileHero,
  BioSection,
  InterestsSection,
  GallerySection,
  FooterSection,
  ControlPanel,
  SectionReorderControls
} from '../../components/dashboard';

// Main App Component
function App() {
  const [controlPanelOpen, setControlPanelOpen] = useState(false);
  const [reorderControlsOpen, setReorderControlsOpen] = useState(false);
  const [sectionOrder, setSectionOrder] = useState(['bio', 'interests', 'gallery']);
  const [settings, setSettings] = useState({
    hero: {
      placeName: "Emma Johnson",
      slogan: "Chasing dreams, finding love",
      location: "Downtown District, USA",
      age: 28,
      lookingFor: "Men",
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      backgroundColor: "#F0EEE6",
      gradientEnabled: false,
      gradientDirection: "to right",
      gradientColors: ["#667eea", "#764ba2"],
      textColor: "#000000",
      sloganColor: "#C08CF0",
      imageShape: "circle",
      imageMask: "none",
      imagePositionX: 0,
      imagePositionY: 0,
      imageScale: 1,
      maskSize: 100,
      imageBackgroundColor: "#D5E4F7",
      badgeColor: "#C08CF0",
      buttonColor: "#C08CF0",
      glowEnabled: true,
      glowPrimaryColor: "rgba(192,140,240,0.3)",
      glowSecondaryColor: "rgba(224,255,79,0.2)",
      fontFamily: "Inter, sans-serif",
      heroLayout: "default"
    },
    bio: {
      backgroundColor: "#f8f9fa",
      gradientEnabled: false,
      gradientDirection: "to right",
      gradientColors: ["#667eea", "#764ba2"],
      textColor: "#000000",
      fontFamily: "Inter, sans-serif",
      designType: "card",
      bio: "I'm a passionate individual who loves exploring new adventures and connecting with like-minded people. Life is too short not to chase your dreams and create meaningful relationships along the way.",
      personality: ["Creative", "Adventurous", "Compassionate", "Optimistic", "Curious", "Genuine"],
      relationshipType: "I'm looking for a genuine connection with someone who shares my values and zest for life. Whether it's exploring new places together, having deep conversations over coffee, or simply enjoying quiet moments, I believe in building something meaningful and lasting."
    },
    interests: {
      backgroundColor: "#f8f9fa",
      gradientEnabled: false,
      gradientDirection: "to right",
      gradientColors: ["#667eea", "#764ba2"],
      textColor: "#000000",
      fontFamily: "Inter, sans-serif",
      designType: "cards",
      interests: ["Travel", "Photography", "Coffee", "Reading", "Music", "Cooking", "Fitness", "Art"]
    },
    gallery: {
      backgroundColor: "#f8f9fa",
      gradientEnabled: false,
      gradientDirection: "to right",
      gradientColors: ["#667eea", "#764ba2"],
      textColor: "#000000",
      fontFamily: "Inter, sans-serif",
      bend: 3,
      borderRadius: 0.05
    },
    footer: {
      backgroundColor: "#000000",
      gradientEnabled: false,
      gradientDirection: "to right",
      gradientColors: ["#000000", "#000000"],
      textColor: "#FFFFFF",
      fontFamily: "Inter, sans-serif",
      designType: "modern",
      footerText: "Ready to start an amazing journey together? Let's connect and create beautiful memories! 💕",
      contactInfo: {
        name: "Emma Johnson",
        email: "emma.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "Downtown District, USA"
      },
      socialLinks: [
        { platform: "instagram", url: "https://instagram.com/emma.johnson" },
        { platform: "facebook", url: "https://facebook.com/emma.johnson" },
        { platform: "twitter", url: "https://twitter.com/emma.johnson" },
        { platform: "linkedin", url: "https://linkedin.com/in/emma.johnson" }
      ]
    }
  });

  const handleSettingsChange = (section, newSettings) => {
    setSettings(prev => ({
      ...prev,
      [section]: newSettings
    }));
  };

  const handleApplyPreset = (preset) => {
    const baseSettings = {
      backgroundColor: preset.colors.bg,
      gradientEnabled: preset.gradient || false,
      gradientDirection: "to right",
      gradientColors: preset.gradientColors || ["#667eea", "#764ba2"],
      textColor: preset.colors.text,
      fontFamily: preset.font
    };

    // Apply to hero with additional properties
    setSettings(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        ...baseSettings,
        sloganColor: preset.colors.accent,
        badgeColor: preset.colors.accent,
        buttonColor: preset.colors.accent
      },
      bio: {
        ...prev.bio,
        ...baseSettings
      },
      gallery: {
        ...prev.gallery,
        ...baseSettings
      }
    }));
  };

  const handleReorderSection = (index, direction) => {
    const newOrder = [...sectionOrder];
    if (direction === 'up' && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    setSectionOrder(newOrder);
  };

  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'bio':
        return <BioSection key="bio" settings={settings.bio} />;
      case 'interests':
        return <InterestsSection key="interests" settings={settings.interests} />;
      case 'gallery':
        return (
          <GallerySection
            key="gallery"
            textColor={settings.gallery.textColor}
            fontFamily={settings.gallery.fontFamily}
            backgroundColor={settings.gallery.backgroundColor}
            gradientEnabled={settings.gallery.gradientEnabled}
            gradientDirection={settings.gallery.gradientDirection}
            gradientColors={settings.gallery.gradientColors}
            gallerySettings={settings.gallery}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <ProfileHero {...settings.hero} />
      {sectionOrder.map(sectionId => renderSection(sectionId))}
      
      <FooterSection settings={settings.footer} />
      
      <SectionReorderControls
        isOpen={reorderControlsOpen}
        onToggle={() => setReorderControlsOpen(!reorderControlsOpen)}
        sectionOrder={sectionOrder}
        onReorderSection={handleReorderSection}
      />
      
      <ControlPanel
        isOpen={controlPanelOpen}
        onToggle={() => setControlPanelOpen(!controlPanelOpen)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onApplyPreset={handleApplyPreset}
      />
    </div>
  );
}

export default App;