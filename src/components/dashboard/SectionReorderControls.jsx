import React from 'react';
import { Layout, User, FileText, Heart, ImageIcon as GalleryIcon, ChevronUp, ChevronDown, X, Menu } from 'lucide-react';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Section Reorder Controls
const SectionReorderControls = ({ isOpen, onToggle, sectionOrder, onReorderSection }) => {
  const sections = [
    { id: 'bio', label: 'Bio', icon: FileText },
    { id: 'interests', label: 'Interests', icon: Heart },
    { id: 'gallery', label: 'Gallery', icon: GalleryIcon }
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-50 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-pink-300 hover:from-pink-500 hover:to-purple-500"
      >
        {isOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
      </button>

      {/* Reorder Panel */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl transform transition-transform duration-300 z-40 overflow-hidden border-r-4 border-pink-200",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-pink-200 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Layout className="h-3 w-3 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Section Order</h2>
          </div>
          <p className="text-sm text-gray-600">Arrange your profile sections 💕</p>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {/* Hero Section (Fixed) */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border-2 border-pink-300 shadow-sm">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-pink-600" />
                <span className="font-medium text-gray-700">Hero (Fixed)</span>
              </div>
              <span className="text-xs text-pink-600 bg-pink-200 px-2 py-1 rounded-full">Fixed</span>
            </div>

            {/* Reorderable Sections */}
            {sectionOrder.map((sectionId, index) => {
              const section = sections.find(s => s.id === sectionId);
              if (!section) return null;

              return (
                <div key={sectionId} className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-pink-200 hover:border-pink-400 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <section.icon className="h-4 w-4 text-pink-600" />
                    <span className="font-medium text-gray-700">{section.label}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onReorderSection(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronUp className="h-4 w-4 text-pink-600" />
                    </button>
                    <button
                      onClick={() => onReorderSection(index, 'down')}
                      disabled={index === sectionOrder.length - 1}
                      className="p-1 rounded hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronDown className="h-4 w-4 text-pink-600" />
                    </button>
                  </div>
                </div>
              );
            })}
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

export default SectionReorderControls; 