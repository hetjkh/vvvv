import React from 'react';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// FooterSection component
const FooterSection = ({ settings }) => {
  const { backgroundColor, gradientEnabled, gradientDirection, gradientColors, textColor, fontFamily, designType, socialLinks, contactInfo, footerText } = settings;
  
  const backgroundStyle = gradientEnabled
    ? { background: `linear-gradient(${gradientDirection}, ${gradientColors[0]}, ${gradientColors[1]})` }
    : { backgroundColor };

  const socialIcons = {
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

  if (designType === 'minimal') {
    return (
      <footer
        className="relative px-6 py-12 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
            <p className="text-lg opacity-80">{footerText}</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-black"
              >
                <span className="text-xl">{socialIcons[link.platform] || socialIcons.default}</span>
              </a>
            ))}
          </div>
          
          <div className="text-sm opacity-60">
            © 2024 {contactInfo.name}. Made with 💕 for meaningful connections.
          </div>
        </div>
      </footer>
    );
  }

  if (designType === 'split') {
    return (
      <footer
        className="relative px-6 py-16 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Contact Info */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                      📧
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                      📱
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href={`tel:${contactInfo.phone}`} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}
                {contactInfo.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                      📍
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm opacity-80">{contactInfo.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Social Links */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {socialIcons[link.platform] || socialIcons.default}
                    </div>
                    <p className="font-medium text-sm capitalize">{link.platform}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t-2 border-white border-opacity-20 text-center">
            <p className="text-sm opacity-60">{footerText}</p>
            <p className="text-xs opacity-40 mt-2">© 2024 {contactInfo.name}. Made with 💕 for meaningful connections.</p>
          </div>
        </div>
      </footer>
    );
  }

  if (designType === 'cards') {
    return (
      <footer
        className="relative px-6 py-16 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
        style={{ ...backgroundStyle, fontFamily, color: textColor }}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-black text-center mb-12">Let's Connect</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Card */}
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300">
              <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                💌 Contact Info
              </h4>
              <div className="space-y-4">
                {contactInfo.email && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📧</span>
                    <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-purple-600 transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📱</span>
                    <a href={`tel:${contactInfo.phone}`} className="text-gray-700 hover:text-purple-600 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
                {contactInfo.location && (
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📍</span>
                    <span className="text-gray-700">{contactInfo.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Social Card */}
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300">
              <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                🌟 Social Media
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all duration-300 border-2 border-pink-200 hover:border-pink-400"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                      {socialIcons[link.platform] || socialIcons.default}
                    </span>
                    <span className="font-medium text-gray-700 capitalize">{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Message Card */}
            <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-2 transition-all duration-300">
              <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                💕 Let's Chat
              </h4>
              <p className="text-gray-700 leading-relaxed mb-6">{footerText}</p>
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Send Message 💌
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm opacity-60">© 2024 {contactInfo.name}. Made with 💕 for meaningful connections.</p>
          </div>
        </div>
      </footer>
    );
  }

  // Default: Modern layout
  return (
    <footer
      className="relative px-6 py-16 md:px-12 lg:px-16 overflow-hidden transition-all duration-500"
      style={{ ...backgroundStyle, fontFamily, color: textColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Spark Vibe</h3>
            <p className="text-lg opacity-80 leading-relaxed">{footerText}</p>
            <div className="flex gap-4">
              {socialLinks.slice(0, 4).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-black"
                >
                  <span className="text-xl">{socialIcons[link.platform] || socialIcons.default}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold">Quick Links</h4>
            <div className="space-y-3">
              <a href="#bio" className="block opacity-80 hover:opacity-100 transition-opacity">About Me</a>
              <a href="#interests" className="block opacity-80 hover:opacity-100 transition-opacity">Interests</a>
              <a href="#gallery" className="block opacity-80 hover:opacity-100 transition-opacity">Gallery</a>
              <a href="#contact" className="block opacity-80 hover:opacity-100 transition-opacity">Contact</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold">Contact</h4>
            <div className="space-y-3">
              {contactInfo.email && (
                <div className="flex items-center gap-3">
                  <span className="text-xl">📧</span>
                  <a href={`mailto:${contactInfo.email}`} className="opacity-80 hover:opacity-100 transition-opacity">
                    {contactInfo.email}
                  </a>
                </div>
              )}
              {contactInfo.phone && (
                <div className="flex items-center gap-3">
                  <span className="text-xl">📱</span>
                  <a href={`tel:${contactInfo.phone}`} className="opacity-80 hover:opacity-100 transition-opacity">
                    {contactInfo.phone}
                  </a>
                </div>
              )}
              {contactInfo.location && (
                <div className="flex items-center gap-3">
                  <span className="text-xl">📍</span>
                  <span className="opacity-80">{contactInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-white border-opacity-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60">© 2024 {contactInfo.name}. Made with 💕 for meaningful connections.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Terms of Service</a>
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-8 left-8 text-pink-200 floating-heart" style={{ animationDelay: '0s' }}>💕</div>
        <div className="absolute bottom-16 right-12 text-purple-200 pulse-heart" style={{ animationDelay: '1s' }}>💖</div>
        <div className="absolute bottom-24 left-16 text-pink-200 floating-heart" style={{ animationDelay: '2s' }}>💝</div>
        <div className="absolute bottom-32 right-8 text-purple-200 pulse-heart" style={{ animationDelay: '0.5s' }}>💕</div>
      </div>
    </footer>
  );
};

export default FooterSection; 