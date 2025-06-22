// Utility function for class names
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Interest icons mapping
export const interestIcons = {
  'Travel': 'Plane',
  'Music': 'Music',
  'Photography': 'Camera',
  'Reading': 'Book',
  'Gaming': 'Gamepad2',
  'Fitness': 'Dumbbell',
  'Cooking': 'Utensils',
  'Art': 'Brush',
  'Technology': 'Code',
  'Coffee': 'Coffee',
  'Dancing': 'Music',
  'Hiking': 'Plane',
  'Yoga': 'Dumbbell',
  'Movies': 'Book',
  'Pets': 'Heart',
  'Fashion': 'Brush',
  'Sports': 'Dumbbell',
  'Writing': 'FileText',
  'Meditation': 'Heart',
  'Volunteering': 'Heart',
  'default': 'Star'
};

// Social media icons mapping
export const socialIcons = {
  'instagram': '📸',
  'facebook': '📘',
  'twitter': '🐦',
  'linkedin': '💼',
  'tiktok': '🎵',
  'snapchat': '👻',
  'youtube': '📺',
  'spotify': '🎵',
  'default': '💕'
};

// Preset colors for design
export const presetColors = [
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

// Gradient presets
export const gradientPresets = [
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

// Font options
export const fontOptions = [
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

// Design presets
export const designPresets = [
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