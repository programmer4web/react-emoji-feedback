import React, { useState } from 'react';

const EmojiFeedbackComponent = ({
  // Single scale configuration
  scale = null, // Can be 'happiness', 'satisfaction', 'effort', 'custom', or a custom scale object
  emojis = null, // Direct emoji array ['😞', '😟', '😐', '😊', '😍']
  labels = null, // Direct labels array ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy']
  title = null, // Custom title for the scale
  
  // Behavior configuration
  enableIntensity = false, // Enable intensity levels by default
  
  // Styling and layout
  size = 'large', // 'small', 'medium', 'large'
  layout = 'horizontal', // 'horizontal', 'vertical'
  showLabels = true, // Show emoji labels
  
  // Callbacks
  onRatingChange = null, // Callback for single rating: (rating, intensity, scale) => {}
  
  // Initial values
  initialRating = null,
  initialIntensity = null
}) => {
  // Predefined emoji scales
  const defaultScales = {
    happiness: {
      emojis: ['😞', '😟', '😐', '😊', '😍'],
      labels: ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'],
      name: '5-Point Happiness Scale'
    },
    satisfaction: {
      emojis: ['😡', '😠', '😐', '😊', '😁'],
      labels: ['Angry', 'Dissatisfied', 'Neutral', 'Satisfied', 'Delighted'],
      name: 'Satisfaction Scale'
    },
    effort: {
      emojis: ['😰', '😓', '😐', '😌', '😎'],
      labels: ['Very Hard', 'Hard', 'Moderate', 'Easy', 'Very Easy'],
      name: 'Effort Scale'
    },
    custom: {
      emojis: ['🔥', '⚡', '💫', '🌟', '✨'],
      labels: ['Fire', 'Electric', 'Magic', 'Star', 'Sparkle'],
      name: 'Custom Energy Scale'
    }
  };

  // Determine the current scale configuration
  const getCurrentScale = () => {
    // If custom emojis and labels are provided directly
    if (emojis && labels) {
      return {
        emojis,
        labels,
        name: title || 'Custom Scale'
      };
    }
    
    // If a scale object is provided directly
    if (scale && typeof scale === 'object') {
      return scale;
    }
    
    // If a predefined scale name is provided
    if (scale && typeof scale === 'string' && defaultScales[scale]) {
      return defaultScales[scale];
    }
    
    // Default fallback
    return defaultScales.happiness;
  };

  const currentScale = getCurrentScale();

  // State management
  const [singleRating, setSingleRating] = useState(initialRating);
  const [singleIntensity, setSingleIntensity] = useState(initialIntensity);
  const [hoveredSingle, setHoveredSingle] = useState(null);

  // Handle single selection rating
  const handleSingleRating = (index, intensity = null) => {
    setSingleRating(index);
    if (enableIntensity && intensity !== null) {
      setSingleIntensity(intensity);
    }
    
    // Call the callback if provided
    if (onRatingChange) {
      onRatingChange(index, intensity, currentScale);
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'text-2xl p-2';
      case 'medium': return 'text-3xl p-2.5';
      case 'large': 
      default: return 'text-4xl p-3';
    }
  };

  // Emoji component with animations
  const EmojiButton = ({ 
    emoji, 
    label, 
    isSelected, 
    isHovered, 
    onClick, 
    onMouseEnter, 
    onMouseLeave,
    showIntensity = false,
    selectedIntensity = null,
    onIntensitySelect = null
  }) => (
    <div className="relative">
      <button
        className={`
          relative ${getSizeClasses()} rounded-full transition-all duration-300 transform
          ${isSelected ? 'scale-125 bg-blue-100' : 'scale-100'}
          ${isHovered ? 'scale-110' : ''}
          hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300
        `}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        title={label}
      >
        <span className={`
          transition-all duration-300
          ${isSelected ? 'animate-bounce' : ''}
        `}>
          {emoji}
        </span>
      </button>
      
      {/* Intensity levels */}
      {showIntensity && isSelected && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex space-x-1 animate-fadeIn">
          {[1, 2, 3].map(intensity => (
            <button
              key={intensity}
              className={`
                w-3 h-3 rounded-full border-2 transition-all duration-200
                ${selectedIntensity === intensity 
                  ? 'bg-blue-500 border-blue-500' 
                  : 'bg-white border-gray-300 hover:border-blue-400'
                }
              `}
              onClick={(e) => {
                e.stopPropagation();
                onIntensitySelect && onIntensitySelect(intensity);
              }}
              title={`Intensity Level ${intensity}`}
            />
          ))}
        </div>
      )}
      
      {/* Label */}
      {showLabels && (isHovered || isSelected) && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap animate-fadeIn">
          {label}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {/* Title */}
      {title && (
        <h3 className="text-lg font-medium mb-4 text-gray-700 text-center">{title}</h3>
      )}

      {/* Emoji Rating */}
      <div className={`flex justify-center ${layout === 'vertical' ? 'flex-col items-center space-y-4' : 'space-x-4'} mb-4`}>
        {currentScale.emojis.map((emoji, index) => (
          <EmojiButton
            key={index}
            emoji={emoji}
            label={currentScale.labels[index]}
            isSelected={singleRating === index}
            isHovered={hoveredSingle === index}
            onClick={() => handleSingleRating(index)}
            onMouseEnter={() => setHoveredSingle(index)}
            onMouseLeave={() => setHoveredSingle(null)}
            showIntensity={enableIntensity}
            selectedIntensity={singleRating === index ? singleIntensity : null}
            onIntensitySelect={(intensity) => setSingleIntensity(intensity)}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EmojiFeedbackComponent;