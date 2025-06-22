import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import Badge from './Badge';
import Glow from './Glow';
import mask1 from '../../app/dashboard/1image.png';
import mask2 from '../../app/dashboard/2image.png';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// ProfileHero component
const ProfileHero = ({
  placeName,
  slogan,
  location,
  age,
  lookingFor,
  verified,
  imageUrl,
  backgroundColor,
  gradientEnabled,
  gradientDirection,
  gradientColors,
  textColor,
  sloganColor,
  imageShape,
  imageBackgroundColor,
  badgeColor,
  buttonColor,
  glowEnabled,
  glowPrimaryColor,
  glowSecondaryColor,
  fontFamily,
  imageMask,
  imagePositionX,
  imagePositionY,
  imageScale,
  heroLayout,
  maskSize
}) => {
  const backgroundStyle = gradientEnabled
    ? { background: `linear-gradient(${gradientDirection}, ${gradientColors[0]}, ${gradientColors[1]})` }
    : { backgroundColor };

  const imageShapeClasses = {
    circle: 'rounded-full'
  };

  const imageMaskStyles = {
    none: {},
    mask1: {
      maskImage: `url(${mask1.src})`,
      WebkitMaskImage: `url(${mask1.src})`,
      maskSize: `${maskSize}%`,
      WebkitMaskSize: `${maskSize}%`,
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
    },
    mask2: {
      maskImage: `url(${mask2.src})`,
      WebkitMaskImage: `url(${mask2.src})`,
      maskSize: `${maskSize}%`,
      WebkitMaskSize: `${maskSize}%`,
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
    }
  };

  const imageContainerStyle = imageMask !== 'none' ? imageMaskStyles[imageMask] : {};

  const DefaultLayout = () => (
    <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
      {/* Left Content */}
      <div className="space-y-8">
        <div className="space-y-8 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
            {placeName}
          </h1>
          <p 
            className="text-3xl md:text-4xl lg:text-5xl font-medium italic animate-pulse"
            style={{ 
              color: sloganColor,
              background: `${sloganColor}20`,
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              display: 'inline-block'
            }}
          >
            {slogan}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-4 animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
          <Badge variant="mint" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {location}
            <ArrowRight className="h-4 w-4" />
          </Badge>
          <Badge variant="custom" customColor={badgeColor}>
            {age} years old
          </Badge>
          <Badge variant="secondary">
            Looking for {lookingFor}
          </Badge>
          {verified && (
            <Badge variant="verified">
              Verified
            </Badge>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-8 animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
          <button
            className="inline-flex items-center px-6 py-3 text-lg font-bold text-white rounded-full transition-all duration-200 hover:scale-105 shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: buttonColor }}
          >
            Connect with {placeName} <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
        {imageMask === 'none' && (
          <div
            className={cn('absolute inset-0 scale-[0.9]', imageShapeClasses[imageShape])}
            style={{ backgroundColor: imageBackgroundColor }}
          />
        )}
        <div
          className={cn(
            'relative aspect-square overflow-hidden scale-[0.8]',
            imageMask === 'none'
              ? 'border-4 border-black shadow-[8px_8px_0px_0px_#000]'
              : '',
            imageMask === 'none' && imageShapeClasses[imageShape]
          )}
          style={imageContainerStyle}
        >
          <img
            src={imageUrl}
            alt={`Profile picture of ${placeName}`}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            style={{
              transform: `translate(${imagePositionX}%, ${imagePositionY}%) scale(${imageScale})`,
            }}
            loading="lazy"
          />
        </div>
        {imageMask === 'none' && (
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-8 px-4 py-2 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_#000] rotate-12 text-black font-bold"
            style={{ backgroundColor: '#B4E197' }}
          >
            Hot Spot!
          </div>
        )}
      </div>
    </div>
  );

  const CenteredLayout = () => (
    <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl mx-auto text-center">
      {/* Image */}
      <div className="relative animate-[fadeInUp_0.8s_ease-out_0.3s_both] mb-8">
        <div
          className={cn(
            'relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden',
            imageMask === 'none'
              ? 'border-4 border-black shadow-[8px_8px_0px_0px_#000]'
              : '',
            imageMask === 'none' && imageShapeClasses[imageShape]
          )}
          style={imageContainerStyle}
        >
          <img
            src={imageUrl}
            alt={`Profile picture of ${placeName}`}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            style={{
              transform: `translate(${imagePositionX}%, ${imagePositionY}%) scale(${imageScale})`,
            }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
            {placeName}
          </h1>
          <p
            className="text-2xl md:text-3xl font-medium italic"
            style={{ color: sloganColor }}
          >
            {slogan}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="mint" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {location}
          </Badge>
          <Badge variant="custom" customColor={badgeColor}>
            {age} years old
          </Badge>
          <Badge variant="secondary">
            Looking for {lookingFor}
          </Badge>
          {verified && (
            <Badge variant="verified">
              Verified
            </Badge>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-4">
          <button
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-200 hover:scale-105 shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: buttonColor }}
          >
            Connect <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderLayout = () => {
    switch (heroLayout) {
      case 'centered':
        return <CenteredLayout />;
      default:
        return <DefaultLayout />;
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden px-6 py-12 md:px-12 lg:px-16 transition-all duration-500 flex items-center"
      style={{ ...backgroundStyle, fontFamily, color: textColor }}
    >
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-xl font-bold">Spark vibe</div>
          <div className="flex gap-8">
            <a href="#resume" className="font-medium border-b-2 pb-1 transition-colors" style={{ color: sloganColor, borderColor: sloganColor }}>
              Resume
            </a>
            <a href="#work" className="opacity-60 hover:opacity-100 transition-opacity">
              Work
            </a>
            <a href="#about" className="opacity-60 hover:opacity-100 transition-opacity">
              About
            </a>
            <a href="#gallery" className="opacity-60 hover:opacity-100 transition-opacity">
              Gallery
            </a>
          </div>
        </div>
      </nav>

      {renderLayout()}

      {/* Background Glow Effects */}
      {glowEnabled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Glow 
            variant="center" 
            className="opacity-30"
            primaryColor={glowPrimaryColor}
            secondaryColor={glowSecondaryColor}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        .floating-heart {
          animation: float 3s ease-in-out infinite;
        }
        
        .pulse-heart {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ProfileHero; 