import React from 'react';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Glow component
const Glow = ({
  variant = 'center',
  className,
  primaryColor = 'rgba(192,140,240,0.3)',
  secondaryColor = 'rgba(224,255,79,0.2)'
}) => {
  const positions = {
    top: 'top-0',
    center: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-0'
  };

  return (
    <div className={cn('absolute w-full', positions[variant], className)}>
      <div
        className="absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] sm:h-[512px]"
        style={{
          background: `radial-gradient(ellipse at center, ${primaryColor} 10%, transparent 60%)`
        }}
      />
      <div
        className="absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] sm:h-[256px]"
        style={{
          background: `radial-gradient(ellipse at center, ${secondaryColor} 10%, transparent 60%)`
        }}
      />
    </div>
  );
};

export default Glow; 