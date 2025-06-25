"use client"
import React, { useEffect, useState } from 'react';
import {
  ProfileHero,
  BioSection,
  InterestsSection,
  GallerySection,
  FooterSection,
  ControlPanel,
  SectionReorderControls
} from '../../components/dashboard';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [controlPanelOpen, setControlPanelOpen] = useState(false);
  const [reorderControlsOpen, setReorderControlsOpen] = useState(false);
  const [sectionOrder, setSectionOrder] = useState(['bio', 'interests', 'gallery']);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/user/profile', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          // Initialize settings from profile data
          setSettings({
            hero: {
              placeName: data.nickname || '',
              slogan: data.slogan || '',
              location: (data.country && data.state) ? `${data.state}, ${data.country}` : '',
              age: data.age || '',
              lookingFor: data.genderPreference || '',
              verified: true,
              imageUrl: data.avatar || '',
              backgroundColor: '#F0EEE6',
              gradientEnabled: false,
              gradientDirection: 'to right',
              gradientColors: ['#667eea', '#764ba2'],
              textColor: '#000000',
              sloganColor: '#C08CF0',
              imageShape: 'circle',
              imageMask: 'none',
              imagePositionX: 0,
              imagePositionY: 0,
              imageScale: 1,
              maskSize: 100,
              imageBackgroundColor: '#D5E4F7',
              badgeColor: '#C08CF0',
              buttonColor: '#C08CF0',
              glowEnabled: true,
              glowPrimaryColor: 'rgba(192,140,240,0.3)',
              glowSecondaryColor: 'rgba(224,255,79,0.2)',
              fontFamily: 'Inter, sans-serif',
              heroLayout: 'default',
            },
            bio: {
              backgroundColor: '#f8f9fa',
              gradientEnabled: false,
              gradientDirection: 'to right',
              gradientColors: ['#667eea', '#764ba2'],
              textColor: '#000000',
              fontFamily: 'Inter, sans-serif',
              designType: 'card',
              bio: data.about || '',
              personality: data.personalityTraits || [],
              bioImage: data.bioImage || '',
            },
            interests: {
              backgroundColor: '#f8f9fa',
              gradientEnabled: false,
              gradientDirection: 'to right',
              gradientColors: ['#667eea', '#764ba2'],
              textColor: '#000000',
              fontFamily: 'Inter, sans-serif',
              designType: 'cards',
              interests: data.interests || [],
            },
            gallery: {
              textColor: '#000000',
              fontFamily: 'Inter, sans-serif',
              backgroundColor: '#f8f9fa',
              gradientEnabled: false,
              gradientDirection: 'to right',
              gradientColors: ['#667eea', '#764ba2'],
              bend: 3,
              borderRadius: 0.05,
              images: data.images || [],
            },
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSettingsChange = (section, newSettings) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...newSettings
      }
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
      interests: {
        ...prev.interests,
        ...baseSettings
      },
      gallery: {
        ...prev.gallery,
        ...baseSettings
      }
    }));
  };

  if (isFetching || !settings) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Loading profile...</div>;
  }
  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">No profile found.</div>;
  }

  // Add default footer settings to prevent undefined errors
  const footerSettings = {
    backgroundColor: '#000000',
    gradientEnabled: false,
    gradientDirection: 'to right',
    gradientColors: ['#000000', '#000000'],
    textColor: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    designType: 'modern',
    footerText: 'Ready to start an amazing journey together? Let\'s connect and create beautiful memories! 💕',
    contactInfo: {
      name: profile.nickname || '',
      email: '',
      phone: '',
      location: (profile.country && profile.state) ? `${profile.state}, ${profile.country}` : ''
    },
    socialLinks: [],
  };

  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'bio':
        return <BioSection key="bio" settings={settings.bio} />;
      case 'interests':
        return <InterestsSection key="interests" settings={settings.interests} />;
      case 'gallery':
        return <GallerySection key="gallery" {...settings.gallery} gallerySettings={settings.gallery} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <ProfileHero {...settings.hero} />
      {sectionOrder.map(sectionId => renderSection(sectionId))}
      <FooterSection settings={footerSettings} />
      <SectionReorderControls
        isOpen={reorderControlsOpen}
        onToggle={() => setReorderControlsOpen(!reorderControlsOpen)}
        sectionOrder={sectionOrder}
        onReorderSection={(index, direction) => {
          const newOrder = [...sectionOrder];
          if (direction === 'up' && index > 0) {
            [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
          } else if (direction === 'down' && index < newOrder.length - 1) {
            [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
          }
          setSectionOrder(newOrder);
        }}
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

export default Dashboard;