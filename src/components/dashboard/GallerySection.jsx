import React from 'react';
import CircularGallery from '../../app/dashboard/CircularGallery';

// Gallery Section Component
const GallerySection = ({
  textColor,
  fontFamily,
  backgroundColor,
  gradientEnabled,
  gradientDirection,
  gradientColors,
  gallerySettings
}) => {
  const backgroundStyle = gradientEnabled
    ? { background: `linear-gradient(${gradientDirection}, ${gradientColors[0]}, ${gradientColors[1]})` }
    : { backgroundColor };

  return (
    <section
      id="gallery"
      className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
      style={{ ...backgroundStyle, fontFamily, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 animate-[fadeInUp_0.6s_ease-out]">
          Moments Gallery
        </h2>
        <div style={{ height: '600px', position: 'relative' }}>
          <CircularGallery
            bend={gallerySettings.bend}
            textColor={gallerySettings.textColor}
            borderRadius={gallerySettings.borderRadius}
          />
        </div>
      </div>

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
      `}</style>
    </section>
  );
};

export default GallerySection; 