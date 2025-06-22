import React from 'react';
import { FileText, Star, Heart } from 'lucide-react';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// BioSection component
const BioSection = ({ settings }) => {
  const { backgroundColor, gradientEnabled, gradientDirection, gradientColors, textColor, fontFamily, designType, bio, personality, relationshipType } = settings;
  
  const backgroundStyle = gradientEnabled
    ? { background: `linear-gradient(${gradientDirection}, ${gradientColors[0]}, ${gradientColors[1]})` }
    : { backgroundColor };

  if (designType === 'card') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 animate-[fadeInUp_0.6s_ease-out]">
            About Me
          </h2>
          
          <div className="space-y-8">
            {/* Bio Card */}
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-800">My Story</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
            </div>

            {/* Personality Card */}
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-6 w-6 text-yellow-500" />
                <h3 className="text-2xl font-bold text-gray-800">Personality</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {personality.map((trait, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium border-2 border-yellow-300 hover:scale-105 transition-transform duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Relationship Type Card */}
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <h3 className="text-2xl font-bold text-gray-800">Looking For</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{relationshipType}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (designType === 'split') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 text-center animate-[fadeInUp_0.6s_ease-out]">
            Get to Know Me
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Bio */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">My Story</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">What I'm Looking For</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{relationshipType}</p>
              </div>
            </div>

            {/* Right Side - Personality */}
            <div className="animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
              <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 h-full">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Personality Traits</h3>
                <div className="grid grid-cols-2 gap-4">
                  {personality.map((trait, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300 text-center hover:scale-105 transition-transform duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Star className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                      <span className="font-medium text-purple-800">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (designType === 'timeline') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 text-center animate-[fadeInUp_0.6s_ease-out]">
            My Journey
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            
            <div className="space-y-12">
              {/* Bio Timeline Item */}
              <div className="relative flex items-start gap-8 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full border-4 border-purple-500 flex items-center justify-center shadow-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">About Me</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
                </div>
              </div>

              {/* Personality Timeline Item */}
              <div className="relative flex items-start gap-8 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full border-4 border-yellow-500 flex items-center justify-center shadow-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">My Personality</h3>
                  <div className="flex flex-wrap gap-3">
                    {personality.map((trait, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium border-2 border-yellow-300 hover:scale-105 transition-transform duration-200"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Relationship Timeline Item */}
              <div className="relative flex items-start gap-8 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full border-4 border-red-500 flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">What I'm Looking For</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{relationshipType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Mosaic design
  return (
    <section
      id="bio"
      className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
      style={{ ...backgroundStyle, fontFamily, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-12 text-center animate-[fadeInUp_0.6s_ease-out]">
          About Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {/* Large Bio Card */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">My Story</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
          </div>

          {/* Relationship Card */}
          <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-red-500" />
              <h3 className="text-xl font-bold text-gray-800">Looking For</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{relationshipType}</p>
          </div>

          {/* Personality Cards */}
          {personality.map((trait, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl border-4 border-purple-300 text-center hover:scale-105 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_both]"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <Star className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <span className="font-bold text-purple-800">{trait}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BioSection; 