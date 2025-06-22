import React from 'react';
import {
  Plane,
  Music,
  Camera,
  Book,
  Gamepad2,
  Dumbbell,
  Utensils,
  Brush,
  Code,
  Coffee,
  Heart,
  FileText,
  Star
} from 'lucide-react';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// InterestsSection component
const InterestsSection = ({ settings }) => {
  const { backgroundColor, gradientEnabled, gradientDirection, gradientColors, textColor, fontFamily, designType, interests } = settings;
  
  const backgroundStyle = gradientEnabled
    ? { background: `linear-gradient(${gradientDirection}, ${gradientColors[0]}, ${gradientColors[1]})` }
    : { backgroundColor };

  const interestIcons = {
    'Travel': Plane,
    'Music': Music,
    'Photography': Camera,
    'Reading': Book,
    'Gaming': Gamepad2,
    'Fitness': Dumbbell,
    'Cooking': Utensils,
    'Art': Brush,
    'Technology': Code,
    'Coffee': Coffee,
    'Dancing': Music,
    'Hiking': Plane,
    'Yoga': Dumbbell,
    'Movies': Book,
    'Pets': Heart,
    'Fashion': Brush,
    'Sports': Dumbbell,
    'Writing': FileText,
    'Meditation': Heart,
    'Volunteering': Heart,
    'default': Star
  };

  if (designType === 'grid') {
    return (
      <section
        id="interests"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 text-center animate-[fadeInUp_0.6s_ease-out]">
            My Interests
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {interests.map((interest, index) => {
              const IconComponent = interestIcons[interest] || interestIcons.default;
              return (
                <div
                  key={index}
                  className="group bg-white p-6 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_both] text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-pink-300">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-600 transition-colors duration-300">
                    {interest}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (designType === 'masonry') {
    return (
      <section
        id="interests"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 text-center animate-[fadeInUp_0.6s_ease-out]">
            What I Love
          </h2>
          
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {interests.map((interest, index) => {
              const IconComponent = interestIcons[interest] || interestIcons.default;
              const heights = ['h-32', 'h-40', 'h-36', 'h-44', 'h-28'];
              const heightClass = heights[index % heights.length];
              
              return (
                <div
                  key={index}
                  className={`group bg-white p-6 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_both] break-inside-avoid ${heightClass}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 h-full">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-pink-300">
                      <IconComponent className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-600 transition-colors duration-300">
                      {interest}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (designType === 'carousel') {
    return (
      <section
        id="interests"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 text-center animate-[fadeInUp_0.6s_ease-out]">
            My Passions
          </h2>
          
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
              {interests.map((interest, index) => {
                const IconComponent = interestIcons[interest] || interestIcons.default;
                return (
                  <div
                    key={index}
                    className="group flex-shrink-0 w-64 bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_both] text-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-pink-300">
                      <IconComponent className="h-10 w-10 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-xl group-hover:text-purple-600 transition-colors duration-300">
                      {interest}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    );
  }

  // Default: Cards layout
  return (
    <section
      id="interests"
      className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
      style={{ ...backgroundStyle, fontFamily, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 text-center animate-[fadeInUp_0.6s_ease-out]">
          Things I Love
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {interests.map((interest, index) => {
            const IconComponent = interestIcons[interest] || interestIcons.default;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_both] text-center relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-pink-300 shadow-lg">
                    <IconComponent className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-xl group-hover:text-purple-600 transition-colors duration-300 mb-2">
                    {interest}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full group-hover:w-16 transition-all duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection; 