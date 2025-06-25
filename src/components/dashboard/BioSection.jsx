import React from 'react';
import { FileText, Star, User, Heart } from 'lucide-react';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// BioSection component
const BioSection = ({ settings }) => {
  const { backgroundColor, gradientEnabled, gradientDirection, gradientColors, textColor, fontFamily, designType, bio, personality } = settings;
  
  const backgroundStyle = gradientEnabled
    ? { background: `linear-gradient(${gradientDirection}, ${gradientColors[0]}, ${gradientColors[1]})` }
    : { backgroundColor };

  // Use real bio image from settings
  const userImage = settings.bioImage || "/images/bio1.jpg";

  // Section Title Component
  const SectionTitle = () => (
    <div className="text-center mb-16 animate-[fadeInUp_0.6s_ease-out]">
      <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_#000] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
        <Heart className="h-8 w-8 text-pink-500" />
        <h2 className="text-4xl md:text-5xl font-black text-gray-800">
          My Story
        </h2>
        <Heart className="h-8 w-8 text-pink-500" />
      </div>
    </div>
  );

  if (designType === 'floating') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle />
          
          <div className="relative">
            {/* Floating Image */}
            <div className="absolute top-0 right-0 w-80 h-80 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              <div className="relative w-full h-full">
                <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-[12px_12px_0px_0px_#000] hover:shadow-[16px_16px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300">
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-pink-400 text-white px-4 py-2 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold transform rotate-12">
                  That's Me! 💕
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl space-y-8">
              {/* Bio Card */}
              <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-2 border-blue-300">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">About Me</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
              </div>

              {/* Personality Tags */}
              <div className="animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Star className="h-6 w-6 text-yellow-500" />
                  My Personality
                </h3>
                <div className="flex flex-wrap gap-3">
                  {personality.map((trait, index) => (
                    <div
                      key={index}
                      className="px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-300 text-purple-800 font-medium hover:scale-105 transition-transform duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {trait}
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

  if (designType === 'centered') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500 flex items-center"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle />
          
          {/* Centered Image */}
          <div className="mb-12 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
            <div className="inline-block relative">
              <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-[12px_12px_0px_0px_#000] hover:shadow-[16px_16px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300">
                <img
                  src={userImage}
                  alt="Profile"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000] animate-bounce">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 mb-8 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
            <p className="text-gray-700 text-xl leading-relaxed">{bio}</p>
          </div>

          {/* Personality Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
            {personality.map((trait, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl border-2 border-pink-300 text-center hover:scale-105 transition-transform duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Star className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <span className="font-medium text-purple-800">{trait}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (designType === 'sidebar') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle />
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar with Image */}
            <div className="lg:col-span-1 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              <div className="sticky top-8">
                <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300">
                  <div className="aspect-square overflow-hidden rounded-2xl border-2 border-gray-200 mb-4">
                    <img
                      src={userImage}
                      alt="Profile"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full border-2 border-pink-300">
                      <User className="h-4 w-4 text-pink-600" />
                      <span className="font-bold text-gray-800">That's Me!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Bio */}
              <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  About Me
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
              </div>

              {/* Personality */}
              <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-600" />
                  My Personality
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {personality.map((trait, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300 text-center hover:scale-105 transition-transform duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Star className="h-5 w-5 mx-auto mb-2 text-purple-600" />
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

  if (designType === 'overlay') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle />
          
          <div className="relative">
            {/* Background Image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-20">
              <img
                src={userImage}
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 bg-white/90 backdrop-blur-sm p-12 rounded-3xl border-4 border-black shadow-[12px_12px_0px_0px_#000] hover:shadow-[16px_16px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              {/* Profile Image */}
              <div className="flex justify-center mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-[8px_8px_0px_0px_#000]">
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">About Me</h3>
                <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">{bio}</p>
              </div>

              {/* Personality */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">My Personality</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {personality.map((trait, index) => (
                    <div
                      key={index}
                      className="px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-300 text-purple-800 font-medium hover:scale-105 transition-transform duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {trait}
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

  if (designType === 'zigzag') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle />
          
          <div className="space-y-16">
            {/* First Row - Image Left, Bio Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                <div className="relative">
                  <div className="w-full max-w-md aspect-square rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300 transform rotate-3 hover:rotate-0">
                    <img
                      src={userImage}
                      alt="Profile"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-pink-400 text-white px-4 py-2 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_#000] font-bold">
                    Hey! 👋
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  About Me
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
              </div>
            </div>

            {/* Second Row - Personality Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-600" />
                  My Personality
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {personality.map((trait, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300 text-center hover:scale-105 transition-transform duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Star className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                      <span className="font-medium text-purple-800 text-sm">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:order-1 flex justify-center animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
                <div className="w-64 h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_#000] flex items-center justify-center transform -rotate-3">
                  <div className="text-center">
                    <Star className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                    <p className="text-2xl font-bold text-purple-800">Personality</p>
                    <p className="text-purple-600">Traits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (designType === 'magazine') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {/* Large Image Card */}
            <div className="md:row-span-2 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border-2 border-gray-200 mb-4">
                <img
                  src={userImage}
                  alt="Profile"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full border-2 border-pink-300">
                  <User className="h-4 w-4 text-pink-600" />
                  <span className="font-bold text-gray-800">That's Me!</span>
                </div>
              </div>
            </div>

            {/* Bio Card */}
            <div className="md:col-span-1 lg:col-span-2 bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800">About Me</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
            </div>

            {/* Personality Cards */}
            {personality.slice(0, 6).map((trait, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-3xl border-4 border-purple-300 text-center hover:scale-105 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_both]"
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
  }

  if (designType === 'polaroid') {
    return (
      <section
        id="bio"
        className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle />
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Polaroid Style Image */}
            <div className="animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              <div className="bg-white p-6 rounded-2xl border-4 border-black shadow-[12px_12px_0px_0px_#000] hover:shadow-[16px_16px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300 transform rotate-2 hover:rotate-0 max-w-md mx-auto">
                <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200 mb-4">
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-800 text-lg mb-2">That's me! 📸</p>
                  <p className="text-gray-600 text-sm">Living my best life ✨</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Bio */}
              <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  About Me
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
              </div>

              {/* Personality */}
              <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-600" />
                  My Personality
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {personality.map((trait, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300 text-center hover:scale-105 transition-transform duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Star className="h-5 w-5 mx-auto mb-2 text-purple-600" />
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

  // Default: Card layout (8th design)
  return (
    <section
      id="bio"
      className="relative min-h-screen px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
      style={{ ...backgroundStyle, fontFamily, color: textColor }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - User Image */}
          <div className="animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
            <div className="relative">
              <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300">
                <div className="aspect-square overflow-hidden rounded-2xl border-2 border-gray-200 mb-4">
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full border-2 border-pink-300">
                    <User className="h-4 w-4 text-pink-600" />
                    <span className="font-bold text-gray-800">That's Me!</span>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full border-2 border-black animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-300 rounded-full border-2 border-black animate-pulse"></div>
            </div>
          </div>

          {/* Right Side - Bio Content */}
          <div className="space-y-8">
            {/* Bio Card */}
            <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-2 border-blue-300">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">About Me</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>
            </div>

            {/* Personality Card */}
            <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center border-2 border-yellow-300">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">My Personality</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {personality.map((trait, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 text-center hover:scale-105 transition-transform duration-200 hover:shadow-md"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Star className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                    <span className="font-medium text-purple-800 text-sm">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;