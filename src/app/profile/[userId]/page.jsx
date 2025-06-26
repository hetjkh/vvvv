"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ProfileHero,
  BioSection,
  InterestsSection,
  GallerySection,
  FooterSection
} from '../../../components/dashboard';

export default function UserProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setIsFetching(true);
    fetch(`http://localhost:5000/api/profiles`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.userId === userId);
        setProfile(found || null);
        setIsFetching(false);
      })
      .catch(() => setIsFetching(false));
  }, [userId]);

  if (isFetching) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Loading profile...</div>;
  }
  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-red-600">Profile not found.</div>;
  }

  // Prepare settings for display components
  const settings = {
    hero: {
      placeName: profile.nickname || '',
      slogan: profile.slogan || '',
      location: (profile.country && profile.state) ? `${profile.state}, ${profile.country}` : '',
      age: profile.age || '',
      lookingFor: profile.genderPreference || '',
      verified: true,
      imageUrl: profile.avatar || '',
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
      bio: profile.about || '',
      personality: profile.personalityTraits || [],
      bioImage: profile.bioImage || '',
    },
    interests: {
      backgroundColor: '#f8f9fa',
      gradientEnabled: false,
      gradientDirection: 'to right',
      gradientColors: ['#667eea', '#764ba2'],
      textColor: '#000000',
      fontFamily: 'Inter, sans-serif',
      designType: 'cards',
      interests: profile.interests || [],
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
      images: profile.images || [],
    },
  };

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

  return (
    <div className="min-h-screen">
      <ProfileHero {...settings.hero} />
      <BioSection settings={settings.bio} />
      <InterestsSection settings={settings.interests} />
      <GallerySection {...settings.gallery} gallerySettings={settings.gallery} />
      <FooterSection settings={footerSettings} />
    </div>
  );
} 