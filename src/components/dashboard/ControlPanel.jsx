import React, { useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Settings,
  Palette,
  Type,
  Image as ImageIcon,
  Layout,
  Sparkles,
  Download,
  Share2,
  Eye,
  EyeOff,
  User,
  ImageIcon as GalleryIcon,
  Copy,
  Heart,
  FileText,
  Star,
  Coffee,
  Music,
  Camera,
  Book,
  Gamepad2,
  Dumbbell,
  Plane,
  Utensils,
  Brush,
  Code,
  ChevronUp,
  ChevronDown,
  X,
  Menu
} from 'lucide-react';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// ControlPanel component
const ControlPanel = ({ isOpen, onToggle, settings, onSettingsChange, onApplyPreset }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeTab, setActiveTab] = useState('background');

  const sections = [
    { id: 'hero', icon: User, label: 'Hero' },
    { id: 'bio', icon: FileText, label: 'Bio' },
    { id: 'interests', icon: Heart, label: 'Interests' },
    { id: 'gallery', icon: GalleryIcon, label: 'Gallery' }
  ];

  const tabs = {
    hero: [
      { id: 'background', icon: Palette, label: 'Background' },
      { id: 'text', icon: Type, label: 'Text' },
      { id: 'image', icon: ImageIcon, label: 'Image' },
      { id: 'effects', icon: Sparkles, label: 'Effects' },
      { id: 'layout', icon: Layout, label: 'Layout' }
    ],
    bio: [
      { id: 'background', icon: Palette, label: 'Background' },
      { id: 'text', icon: Type, label: 'Text' },
      { id: 'design', icon: Layout, label: 'Design' }
    ],
    interests: [
      { id: 'background', icon: Palette, label: 'Background' },
      { id: 'text', icon: Type, label: 'Text' },
      { id: 'design', icon: Layout, label: 'Design' }
    ],
    gallery: [
      { id: 'background', icon: Palette, label: 'Background' },
      { id: 'text', icon: Type, label: 'Text' },
      { id: 'gallery', icon: GalleryIcon, label: 'Gallery' }
    ]
  };

  const presetColors = [
    '#F0EEE6', '#FFE5E5', '#E5F3FF', '#E5FFE5', '#FFF5E5',
    '#F3E5FF', '#FFE5F3', '#E5FFFF', '#FFFFE5', '#E5E5E5',
    // Dating-themed colors
    '#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#DC143C',
    '#FF6347', '#FF4500', '#FF8C00', '#FFD700', '#FFA500',
    '#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFB6C1',
    '#E6E6FA', '#DDA0DD', '#D8BFD8', '#DDA0DD', '#EE82EE',
    '#9370DB', '#8A2BE2', '#9400D3', '#9932CC', '#BA55D3',
    '#20B2AA', '#48D1CC', '#40E0D0', '#7FFFD4', '#00CED1'
  ];

  const gradientPresets = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a8edea', '#fed6e3'],
    ['#ff9a9e', '#fecfef'],
    ['#ffecd2', '#fcb69f'],
    // Dating-themed gradients
    ['#FF69B4', '#FF1493'],
    ['#FFB6C1', '#FFC0CB'],
    ['#FF69B4', '#C71585'],
    ['#FF1493', '#DC143C'],
    ['#FF6347', '#FF4500'],
    ['#FFD700', '#FFA500'],
    ['#E6E6FA', '#DDA0DD'],
    ['#9370DB', '#8A2BE2'],
    ['#20B2AA', '#48D1CC'],
    ['#FF69B4', '#FFB6C1'],
    ['#FF1493', '#FF69B4'],
    ['#C71585', '#DB7093'],
    ['#FF6347', '#FF8C00'],
    ['#FFD700', '#FF6347'],
    ['#E6E6FA', '#9370DB'],
    ['#DDA0DD', '#BA55D3'],
    ['#20B2AA', '#7FFFD4'],
    ['#48D1CC', '#00CED1']
  ];

  const fontOptions = [
    'Inter, sans-serif',
    'Poppins, sans-serif',
    'Montserrat, sans-serif',
    'Roboto, sans-serif',
    'Playfair Display, serif',
    'Merriweather, serif',
    'Dancing Script, cursive',
    'Great Vibes, cursive',
    'Pacifico, cursive',
    'Satisfy, cursive',
    'Kaushan Script, cursive',
    'Allura, cursive'
  ];

  const designPresets = [
    {
      name: 'Minimalist',
      colors: { bg: '#FFFFFF', text: '#000000', accent: '#6B7280' },
      font: 'Inter, sans-serif',
      gradient: false
    },
    {
      name: 'Vibrant',
      colors: { bg: '#FF6B6B', text: '#FFFFFF', accent: '#4ECDC4' },
      font: 'Poppins, sans-serif',
      gradient: true,
      gradientColors: ['#FF6B6B', '#4ECDC4']
    },
    {
      name: 'Professional',
      colors: { bg: '#1F2937', text: '#FFFFFF', accent: '#3B82F6' },
      font: 'Roboto, sans-serif',
      gradient: false
    },
    {
      name: 'Sunset',
      colors: { bg: '#FEE2E2', text: '#7C2D12', accent: '#EA580C' },
      font: 'Montserrat, sans-serif',
      gradient: true,
      gradientColors: ['#FED7AA', '#FECACA']
    },
    {
      name: 'Ocean',
      colors: { bg: '#DBEAFE', text: '#1E3A8A', accent: '#3B82F6' },
      font: 'Inter, sans-serif',
      gradient: true,
      gradientColors: ['#DBEAFE', '#BFDBFE']
    },
    {
      name: 'Forest',
      colors: { bg: '#D1FAE5', text: '#064E3B', accent: '#059669' },
      font: 'Merriweather, serif',
      gradient: true,
      gradientColors: ['#D1FAE5', '#A7F3D0']
    },
    // Dating-themed presets
    {
      name: 'Romantic Rose',
      colors: { bg: '#FFE5E5', text: '#8B0000', accent: '#FF69B4' },
      font: 'Dancing Script, cursive',
      gradient: true,
      gradientColors: ['#FFB6C1', '#FFC0CB']
    },
    {
      name: 'Passionate Pink',
      colors: { bg: '#FFC0CB', text: '#8B0000', accent: '#FF1493' },
      font: 'Great Vibes, cursive',
      gradient: true,
      gradientColors: ['#FF69B4', '#FF1493']
    },
    {
      name: 'Sweet Lavender',
      colors: { bg: '#E6E6FA', text: '#4B0082', accent: '#9370DB' },
      font: 'Pacifico, cursive',
      gradient: true,
      gradientColors: ['#DDA0DD', '#D8BFD8']
    },
    {
      name: 'Golden Sunset',
      colors: { bg: '#FFF8DC', text: '#8B4513', accent: '#FFD700' },
      font: 'Satisfy, cursive',
      gradient: true,
      gradientColors: ['#FFD700', '#FFA500']
    },
    {
      name: 'Ocean Breeze',
      colors: { bg: '#E0FFFF', text: '#006994', accent: '#20B2AA' },
      font: 'Kaushan Script, cursive',
      gradient: true,
      gradientColors: ['#48D1CC', '#40E0D0']
    },
    {
      name: 'Berry Bliss',
      colors: { bg: '#F8F8FF', text: '#4B0082', accent: '#8A2BE2' },
      font: 'Allura, cursive',
      gradient: true,
      gradientColors: ['#DDA0DD', '#EE82EE']
    },
    {
      name: 'Coral Dream',
      colors: { bg: '#FFF0F5', text: '#8B0000', accent: '#FF6347' },
      font: 'Dancing Script, cursive',
      gradient: true,
      gradientColors: ['#FFB6C1', '#FF69B4']
    },
    {
      name: 'Mint Romance',
      colors: { bg: '#F0FFF0', text: '#006400', accent: '#20B2AA' },
      font: 'Great Vibes, cursive',
      gradient: true,
      gradientColors: ['#7FFFD4', '#00CED1']
    },
    {
      name: 'Velvet Night',
      colors: { bg: '#F8F8FF', text: '#4B0082', accent: '#9370DB' },
      font: 'Pacifico, cursive',
      gradient: true,
      gradientColors: ['#E6E6FA', '#DDA0DD']
    }
  ];

  const applyToAllSections = () => {
    const baseSettings = {
      backgroundColor: settings.hero.backgroundColor,
      gradientEnabled: settings.hero.gradientEnabled,
      gradientDirection: settings.hero.gradientDirection,
      gradientColors: settings.hero.gradientColors,
      textColor: settings.hero.textColor,
      fontFamily: settings.hero.fontFamily
    };

    ['bio', 'interests', 'gallery'].forEach(section => {
      onSettingsChange(section, {
        ...settings[section],
        ...baseSettings
      });
    });
  };

  const currentSettings = settings[activeSection];
  const currentTabs = tabs[activeSection];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 z-50 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-pink-300 hover:from-pink-500 hover:to-purple-500"
      >
        {isOpen ? <EyeOff className="h-5 w-5 text-white" /> : <Heart className="h-5 w-5 text-white" />}
      </button>

      {/* Control Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl transform transition-transform duration-300 z-40 border-l-4 border-pink-200",
        "flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-4 border-b border-pink-200 bg-gradient-to-r from-pink-100 to-purple-100 shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Customize Profile</h2>
              <p className="text-sm text-gray-600 mt-1">Make it uniquely yours 💕</p>
            </div>
          </div>
          
          {/* Design Presets */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-500" />
              Design Presets
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {designPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => onApplyPreset(preset)}
                  className="p-2 text-xs rounded-md border-2 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  style={{ 
                    background: preset.gradient ? `linear-gradient(to right, ${preset.gradientColors[0]}, ${preset.gradientColors[1]})` : preset.colors.bg,
                    color: preset.colors.text,
                    borderColor: preset.colors.accent
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Apply to All Button */}
          <button
            onClick={applyToAllSections}
            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md hover:from-pink-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
          >
            <Copy className="h-4 w-4" />
            Apply Hero Settings to All
          </button>
        </div>

        {/* Section & Tab Selectors */}
        <div className="shrink-0">
          {/* Section Selector */}
          <div className="flex border-b border-pink-200 overflow-x-auto bg-white">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "flex items-center justify-center gap-1 px-3 py-3 text-xs font-medium transition-all duration-200 whitespace-nowrap relative",
                  activeSection === section.id 
                    ? "text-pink-600 border-b-2 border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50" 
                    : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                )}
              >
                <section.icon className="h-3 w-3" />
                {section.label}
                {activeSection === section.id && (
                  <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
  
          {/* Tabs */}
          <div className="flex border-b border-pink-200 overflow-x-auto bg-white">
            {currentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-3 text-xs font-medium whitespace-nowrap transition-all duration-200 relative",
                  activeTab === tab.id 
                    ? "text-pink-600 border-b-2 border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50" 
                    : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                )}
              >
                <tab.icon className="h-3 w-3" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Scrolling Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-pink-50 relative">
          <div className="space-y-8">
            {/* Floating Hearts Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              <div className="absolute top-4 right-4 text-pink-200 floating-heart" style={{ animationDelay: '0s' }}>💕</div>
              <div className="absolute top-12 left-8 text-purple-200 pulse-heart" style={{ animationDelay: '1s' }}>💖</div>
              <div className="absolute top-24 right-12 text-pink-200 floating-heart" style={{ animationDelay: '2s' }}>💝</div>
              <div className="absolute top-36 left-16 text-purple-200 pulse-heart" style={{ animationDelay: '0.5s' }}>💕</div>
              <div className="absolute top-48 right-8 text-pink-200 floating-heart" style={{ animationDelay: '1.5s' }}>💖</div>
              <div className="absolute top-60 left-12 text-purple-200 pulse-heart" style={{ animationDelay: '0.8s' }}>💝</div>
              <div className="absolute top-72 right-16 text-pink-200 floating-heart" style={{ animationDelay: '1.2s' }}>💕</div>
            </div>
            
            {/* Background Tab */}
            {activeTab === 'background' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Palette className="h-4 w-4 text-pink-500" />
                    Background Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, gradientEnabled: false })}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border-2",
                        !currentSettings.gradientEnabled ? "bg-pink-100 text-pink-800 border-pink-300 shadow-md" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-pink-50"
                      )}
                    >
                      Solid
                    </button>
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, gradientEnabled: true })}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border-2",
                        currentSettings.gradientEnabled ? "bg-pink-100 text-pink-800 border-pink-300 shadow-md" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-pink-50"
                      )}
                    >
                      Gradient
                    </button>
                  </div>
                </div>

                {!currentSettings.gradientEnabled ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Palette className="h-4 w-4 text-pink-500" />
                      Background Color
                    </label>
                    <div className="grid grid-cols-6 gap-2 mb-3">
                      {presetColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => onSettingsChange(activeSection, { ...currentSettings, backgroundColor: color })}
                          className="w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-md"
                          style={{ 
                            backgroundColor: color,
                            borderColor: currentSettings.backgroundColor === color ? '#ec4899' : '#e5e7eb'
                          }}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={currentSettings.backgroundColor}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, backgroundColor: e.target.value })}
                      className="w-full h-12 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Layout className="h-4 w-4 text-pink-500" />
                        Gradient Direction
                      </label>
                      <select
                        value={currentSettings.gradientDirection}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, gradientDirection: e.target.value })}
                        className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                      >
                        <option value="to right">Left to Right</option>
                        <option value="to left">Right to Left</option>
                        <option value="to bottom">Top to Bottom</option>
                        <option value="to top">Bottom to Top</option>
                        <option value="to bottom right">Diagonal ↘</option>
                        <option value="to bottom left">Diagonal ↙</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-pink-500" />
                        Gradient Presets
                      </label>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {gradientPresets.map((colors, index) => (
                          <button
                            key={index}
                            onClick={() => onSettingsChange(activeSection, { ...currentSettings, gradientColors: colors })}
                            className="w-full h-12 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-md"
                            style={{ 
                              background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
                              borderColor: JSON.stringify(currentSettings.gradientColors) === JSON.stringify(colors) ? '#ec4899' : '#e5e7eb'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Color</label>
                        <input
                          type="color"
                          value={currentSettings.gradientColors[0]}
                          onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, gradientColors: [e.target.value, currentSettings.gradientColors[1]] })}
                          className="w-full h-12 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Color</label>
                        <input
                          type="color"
                          value={currentSettings.gradientColors[1]}
                          onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, gradientColors: [currentSettings.gradientColors[0], e.target.value] })}
                          className="w-full h-12 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Text Tab */}
            {activeTab === 'text' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Type className="h-4 w-4 text-pink-500" />
                    Font Family
                  </label>
                  <select
                    value={currentSettings.fontFamily}
                    onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, fontFamily: e.target.value })}
                    className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font} style={{ fontFamily: font }}>{font.split(',')[0]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Type className="h-4 w-4 text-pink-500" />
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={currentSettings.textColor}
                    onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, textColor: e.target.value })}
                    className="w-full h-12 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                  />
                </div>

                {activeSection === 'hero' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-pink-500" />
                        Slogan Color
                      </label>
                      <input
                        type="color"
                        value={currentSettings.sloganColor}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, sloganColor: e.target.value })}
                        className="w-full h-12 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-pink-500" />
                        Badge Color
                      </label>
                      <input
                        type="color"
                        value={currentSettings.badgeColor}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, badgeColor: e.target.value })}
                        className="w-full h-12 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-500" />
                        Button Color
                      </label>
                      <input
                        type="color"
                        value={currentSettings.buttonColor}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, buttonColor: e.target.value })}
                        className="w-full h-12 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Design Tab */}
            {activeTab === 'design' && activeSection === 'bio' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Design Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, designType: 'card' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.designType === 'card' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Card Layout
                    </button>
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, designType: 'split' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.designType === 'split' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Split Layout
                    </button>
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, designType: 'timeline' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.designType === 'timeline' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Timeline Layout
                    </button>
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, designType: 'mosaic' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.designType === 'mosaic' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Mosaic Layout
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={currentSettings.bio}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, bio: e.target.value })}
                      className="w-full p-3 border rounded-md h-24 text-sm"
                      placeholder="Tell your story..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personality Traits
                    </label>
                    <div className="space-y-2">
                      {currentSettings.personality.map((trait, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={trait}
                            onChange={(e) => {
                              const newTraits = [...currentSettings.personality];
                              newTraits[index] = e.target.value;
                              onSettingsChange(activeSection, { ...currentSettings, personality: newTraits });
                            }}
                            className="flex-1 p-2 border rounded-md text-sm"
                          />
                          <button
                            onClick={() => {
                              const newTraits = currentSettings.personality.filter((_, i) => i !== index);
                              onSettingsChange(activeSection, { ...currentSettings, personality: newTraits });
                            }}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newTraits = [...currentSettings.personality, 'New Trait'];
                          onSettingsChange(activeSection, { ...currentSettings, personality: newTraits });
                        }}
                        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:border-gray-400"
                      >
                        + Add Trait
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship Type
                    </label>
                    <textarea
                      value={currentSettings.relationshipType}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, relationshipType: e.target.value })}
                      className="w-full p-3 border rounded-md h-20 text-sm"
                      placeholder="What kind of relationship are you looking for?"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Design Tab for Interests */}
            {activeTab === 'design' && activeSection === 'interests' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Design Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, designType: 'cards' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.designType === 'cards' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Cards Layout
                    </button>
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, designType: 'grid' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.designType === 'grid' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Grid Layout
                    </button>
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, designType: 'masonry' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.designType === 'masonry' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Masonry Layout
                    </button>
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, designType: 'carousel' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.designType === 'carousel' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Carousel Layout
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests
                  </label>
                  <div className="space-y-2">
                    {currentSettings.interests.map((interest, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={interest}
                          onChange={(e) => {
                            const newInterests = [...currentSettings.interests];
                            newInterests[index] = e.target.value;
                            onSettingsChange(activeSection, { ...currentSettings, interests: newInterests });
                          }}
                          className="flex-1 p-2 border rounded-md text-sm"
                          placeholder="Enter interest..."
                        />
                        <button
                          onClick={() => {
                            const newInterests = currentSettings.interests.filter((_, i) => i !== index);
                            onSettingsChange(activeSection, { ...currentSettings, interests: newInterests });
                          }}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newInterests = [...currentSettings.interests, 'New Interest'];
                        onSettingsChange(activeSection, { ...currentSettings, interests: newInterests });
                      }}
                      className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:border-gray-400"
                    >
                      + Add Interest
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && activeSection === 'gallery' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gallery Bend: {currentSettings.bend}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={currentSettings.bend}
                    onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, bend: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius: {currentSettings.borderRadius}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={currentSettings.borderRadius}
                    onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, borderRadius: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Image Tab (only for hero section) */}
            {activeTab === 'image' && activeSection === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Background Color
                  </label>
                  <input
                    type="color"
                    value={currentSettings.imageBackgroundColor}
                    onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, imageBackgroundColor: e.target.value })}
                    className="w-full h-10 rounded border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={currentSettings.imageUrl}
                    onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, imageUrl: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Image Shape</label>
                  <select
                    value={currentSettings.imageShape}
                    onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, imageShape: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700"
                  >
                    <option value="circle">Circle</option>
                    {/* Add other shapes if needed */}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image Mask</label>
                  <select
                    value={currentSettings.imageMask}
                    onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, imageMask: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700"
                  >
                    <option value="none">None</option>
                    <option value="mask1">Brush Stroke</option>
                    <option value="mask2">Ink Splatter</option>
                  </select>
                </div>
                {currentSettings.imageMask !== 'none' && (
                  <div className="space-y-4 border-t border-pink-200 pt-4 mt-4">
                     <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mask Size: {currentSettings.maskSize}%
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        step="5"
                        value={currentSettings.maskSize}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, maskSize: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image Zoom: {currentSettings.imageScale}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.05"
                        value={currentSettings.imageScale}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, imageScale: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Horizontal Position: {currentSettings.imagePositionX}%
                      </label>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        value={currentSettings.imagePositionX}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, imagePositionX: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vertical Position: {currentSettings.imagePositionY}%
                      </label>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        value={currentSettings.imagePositionY}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, imagePositionY: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Effects Tab (only for hero section) */}
            {activeTab === 'effects' && activeSection === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={currentSettings.glowEnabled}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, glowEnabled: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Enable Glow Effects</span>
                  </label>
                </div>

                {currentSettings.glowEnabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Glow Color
                      </label>
                      <input
                        type="color"
                        value={currentSettings.glowPrimaryColor.match(/#[0-9a-f]{6}/i)?.[0] || '#c08cf0'}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, glowPrimaryColor: `${e.target.value}4d` })}
                        className="w-full h-10 rounded border"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Glow Color
                      </label>
                      <input
                        type="color"
                        value={currentSettings.glowSecondaryColor.match(/#[0-9a-f]{6}/i)?.[0] || '#e0ff4f'}
                        onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, glowSecondaryColor: `${e.target.value}33` })}
                        className="w-full h-10 rounded border"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Layout Tab (only for hero section) */}
            {activeTab === 'layout' && activeSection === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Layout
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, heroLayout: 'default' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.heroLayout === 'default' || !currentSettings.heroLayout ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Default
                    </button>
                    <button
                      onClick={() => onSettingsChange(activeSection, { ...currentSettings, heroLayout: 'centered' })}
                      className={cn(
                        "p-3 text-sm font-medium rounded-md transition-colors",
                        currentSettings.heroLayout === 'centered' ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      Centered
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Information
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={currentSettings.placeName}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, placeName: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      placeholder="Full Name"
                    />
                    <input
                      type="text"
                      value={currentSettings.slogan}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, slogan: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      placeholder="Your slogan"
                    />
                    <input
                      type="text"
                      value={currentSettings.location}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, location: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      placeholder="Location"
                    />
                    <input
                      type="number"
                      value={currentSettings.age}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, age: parseInt(e.target.value) })}
                      className="w-full p-2 border rounded-md"
                      placeholder="Age"
                    />
                    <input
                      type="text"
                      value={currentSettings.lookingFor}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, lookingFor: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      placeholder="Looking for"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={currentSettings.verified}
                      onChange={(e) => onSettingsChange(activeSection, { ...currentSettings, verified: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Verified Profile</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 border-t-4 border-pink-200 shrink-0">
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default ControlPanel; 