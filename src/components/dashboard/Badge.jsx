import React from 'react';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Badge component
const Badge = ({ children, variant = 'default', className, customColor }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    default: "border-transparent bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500",
    secondary: "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
    mint: "bg-green-200 text-green-800 border-green-300 focus:ring-green-500",
    verified: "bg-emerald-500 text-white border-transparent focus:ring-emerald-500",
    custom: "border-transparent text-white focus:ring-purple-500"
  };

  const style = variant === 'custom' && customColor ? { backgroundColor: customColor } : {};

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
    >
      {children}
    </div>
  );
};

export default Badge; 