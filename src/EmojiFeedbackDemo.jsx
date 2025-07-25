import React, { useState } from 'react';

// Import the main component (in a real project, this would be from a separate file)
// import EmojiFeedbackComponent from './EmojiFeedbackComponent';

// For demo purposes, including the component inline

const EmojiFeedbackComponent = ({
  scale = null,
  emojis = null,
  labels = null,
  title = null,
  enableIntensity = false,
  size = 'large',
  layout = 'horizontal',
  showLabels = true,
  onRatingChange = null,
  initialRating = null,
  initialIntensity = null
}) => {
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

  const getCurrentScale = () => {
    if (emojis && labels) {
      return { emojis, labels, name: title || 'Custom Scale' };
    }
    if (scale && typeof scale === 'object') {
      return scale;
    }
    if (scale && typeof scale === 'string' && defaultScales[scale]) {
      return defaultScales[scale];
    }
    return defaultScales.happiness;
  };

  const currentScale = getCurrentScale();
  const [singleRating, setSingleRating] = useState(initialRating);
  const [singleIntensity, setSingleIntensity] = useState(initialIntensity);
  const [hoveredSingle, setHoveredSingle] = useState(null);

  const handleSingleRating = (index, intensity = null) => {
    setSingleRating(index);
    if (enableIntensity && intensity !== null) {
      setSingleIntensity(intensity);
    }
    if (onRatingChange) {
      onRatingChange(index, intensity, currentScale);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'text-2xl p-2';
      case 'medium': return 'text-3xl p-2.5';
      case 'large': 
      default: return 'text-4xl p-3';
    }
  };

  const EmojiButton = ({ 
    emoji, label, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave,
    showIntensity = false, selectedIntensity = null, onIntensitySelect = null
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
        <span className={`transition-all duration-300 ${isSelected ? 'animate-bounce' : ''}`}>
          {emoji}
        </span>
      </button>
      
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
      
      {showLabels && (isHovered || isSelected) && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap animate-fadeIn">
          {label}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-medium mb-4 text-gray-700 text-center">{title}</h3>
      )}
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

// Multi-dimensional component for demos
const MultiDimensionalRating = ({ aspects = ['quality', 'speed', 'price'], onRatingChange = null }) => {
  const satisfactionScale = {
    emojis: ['😡', '😠', '😐', '😊', '😁'],
    labels: ['Angry', 'Dissatisfied', 'Neutral', 'Satisfied', 'Delighted']
  };

  const [ratings, setRatings] = useState(
    aspects.reduce((acc, aspect) => ({ ...acc, [aspect]: null }), {})
  );
  const [hoveredMulti, setHoveredMulti] = useState({});

  const handleRating = (aspect, index) => {
    const newRatings = { ...ratings, [aspect]: index };
    setRatings(newRatings);
    if (onRatingChange) onRatingChange(newRatings);
  };

  return (
    <div className="space-y-6">
      {aspects.map((aspect) => (
        <div key={aspect}>
          <h3 className="text-lg font-medium mb-3 capitalize text-gray-700 text-center">{aspect}</h3>
          <div className="flex justify-center space-x-4">
            {satisfactionScale.emojis.map((emoji, index) => (
              <button
                key={`${aspect}-${index}`}
                className={`
                  text-4xl p-3 rounded-full transition-all duration-300 transform
                  ${ratings[aspect] === index ? 'scale-125 bg-blue-100' : 'scale-100'}
                  ${hoveredMulti[aspect] === index ? 'scale-110' : ''}
                  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300
                `}
                onClick={() => handleRating(aspect, index)}
                onMouseEnter={() => setHoveredMulti(prev => ({ ...prev, [aspect]: index }))}
                onMouseLeave={() => setHoveredMulti(prev => ({ ...prev, [aspect]: null }))}
                title={satisfactionScale.labels[index]}
              >
                <span className={`transition-all duration-300 ${ratings[aspect] === index ? 'animate-bounce' : ''}`}>
                  {emoji}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
      
      {Object.values(ratings).some(rating => rating !== null) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Your Ratings:</h4>
          <div className="space-y-1">
            {Object.entries(ratings).map(([aspect, rating]) => (
              rating !== null && (
                <div key={aspect} className="flex justify-between items-center">
                  <span className="capitalize text-gray-700">{aspect}:</span>
                  <span className="font-medium text-gray-800">
                    {satisfactionScale.emojis[rating]} {satisfactionScale.labels[rating]}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Demo Component
const EmojiFeedbackDemo = () => {
  const [demoResults, setDemoResults] = useState({});

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Emoji Feedback Component</h1>
        <p className="text-xl text-gray-600 mb-2">A versatile React component for emoji-based ratings and feedback</p>
        <p className="text-gray-500">Highly configurable with multiple scales, sizes, and interaction modes</p>
      </div>

      {/* Basic Examples */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Simple Rating */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Simple Rating</h2>
          <EmojiFeedbackComponent
            scale="satisfaction"
            title="How satisfied are you with our service?"
            onRatingChange={(rating, intensity, scale) => 
              setDemoResults(prev => ({ ...prev, simple: { rating, scale: scale.labels[rating] } }))
            }
          />
          {demoResults.simple && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
              <p className="text-blue-800 font-medium">Selected: {demoResults.simple.scale}</p>
            </div>
          )}
        </div>

        {/* Custom Emoji Scale */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Custom Scale</h2>
          <EmojiFeedbackComponent
            emojis={['🥶', '🙂', '🔥', '🚀', '🌟']}
            labels={['Cold', 'Okay', 'Hot', 'Amazing', 'Perfect']}
            title="Rate the temperature"
            enableIntensity={true}
            onRatingChange={(rating, intensity, scale) => 
              setDemoResults(prev => ({ 
                ...prev, 
                custom: { 
                  rating: scale.labels[rating], 
                  intensity: intensity ? `Level ${intensity}` : null 
                }
              }))
            }
          />
          {demoResults.custom && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
              <p className="text-green-800 font-medium">
                {demoResults.custom.rating}
                {demoResults.custom.intensity && ` (${demoResults.custom.intensity})`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Size Variations */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Size Variations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-3 text-gray-700 text-center">Small</h3>
            <EmojiFeedbackComponent
              scale="happiness"
              size="small"
              showLabels={false}
            />
          </div>
          <div>
            <h3 className="font-medium mb-3 text-gray-700 text-center">Medium</h3>
            <EmojiFeedbackComponent
              scale="happiness"
              size="medium"
              showLabels={false}
            />
          </div>
          <div>
            <h3 className="font-medium mb-3 text-gray-700 text-center">Large</h3>
            <EmojiFeedbackComponent
              scale="happiness"
              size="large"
              showLabels={false}
            />
          </div>
        </div>
      </div>

      {/* Layout Options */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Horizontal Layout</h2>
          <EmojiFeedbackComponent
            scale="effort"
            title="How difficult was this task?"
            layout="horizontal"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Vertical Layout</h2>
          <EmojiFeedbackComponent
            scale="effort"
            title="How difficult was this task?"
            layout="vertical"
            size="medium"
          />
        </div>
      </div>

      {/* Multi-Dimensional Rating */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Multi-Dimensional Rating</h2>
        <p className="text-gray-600 mb-6 text-center">Rate different aspects separately</p>
        <MultiDimensionalRating
          aspects={['quality', 'speed', 'price']}
          onRatingChange={(ratings) => 
            setDemoResults(prev => ({ ...prev, multi: ratings }))
          }
        />
      </div>

      {/* Advanced Features */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Advanced Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium mb-4 text-gray-700">With Intensity Levels</h3>
            <EmojiFeedbackComponent
              scale="satisfaction"
              enableIntensity={true}
              title="Rate with sub-levels"
              onRatingChange={(rating, intensity, scale) => 
                setDemoResults(prev => ({ 
                  ...prev, 
                  intensity: { 
                    rating: scale.labels[rating], 
                    level: intensity 
                  }
                }))
              }
            />
            {demoResults.intensity && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
                <p className="text-purple-800 font-medium">
                  {demoResults.intensity.rating}
                  {demoResults.intensity.level && ` (Intensity: ${demoResults.intensity.level}/3)`}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-gray-700">Custom Theme Scale</h3>
            <EmojiFeedbackComponent
              emojis={['💀', '😵', '😐', '😎', '🎉']}
              labels={['Terrible', 'Bad', 'Okay', 'Good', 'Awesome']}
              title="Rate your experience"
              size="medium"
            />
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Code Examples</h2>
        <div className="grid gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium mb-2 text-gray-700">Basic Usage</h3>
            <pre className="text-sm text-gray-600 overflow-x-auto">
{`<EmojiFeedbackComponent
  scale="satisfaction"
  title="How satisfied are you?"
  onRatingChange={(rating, intensity, scale) => {
    console.log('Rating:', rating, scale.labels[rating]);
  }}
/>`}
            </pre>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium mb-2 text-gray-700">Custom Scale</h3>
            <pre className="text-sm text-gray-600 overflow-x-auto">
{`<EmojiFeedbackComponent
  emojis={['🥶', '🙂', '🔥', '🚀', '🌟']}
  labels={['Cold', 'Okay', 'Hot', 'Amazing', 'Perfect']}
  title="Rate the temperature"
  enableIntensity={true}
  size="medium"
/>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Interactive Playground */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Interactive Playground</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-3 text-gray-700">Quick Rating</h3>
            <div className="flex justify-center space-x-2">
              {['👍', '👎', '❤️', '🔥', '💯'].map((emoji, index) => (
                <button
                  key={index}
                  className="text-3xl p-3 rounded-full hover:bg-white hover:shadow-md transition-all duration-200 transform hover:scale-110"
                  onClick={() => console.log(`Quick rating: ${emoji}`)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 text-gray-700">Mood Check</h3>
            <div className="flex justify-center space-x-2">
              {['🤩', '🥳', '😴', '🤔', '🚀'].map((emoji, index) => (
                <button
                  key={index}
                  className="text-3xl p-3 rounded-full hover:bg-white hover:shadow-md transition-all duration-200 transform hover:scale-110"
                  onClick={() => console.log(`Mood: ${emoji}`)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 text-gray-700">Energy Level</h3>
            <div className="flex justify-center space-x-2">
              {['💤', '😑', '😊', '⚡', '🔋'].map((emoji, index) => (
                <button
                  key={index}
                  className="text-3xl p-3 rounded-full hover:bg-white hover:shadow-md transition-all duration-200 transform hover:scale-110"
                  onClick={() => console.log(`Energy: ${emoji}`)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500">
        <p>Built with React and Tailwind CSS</p>
        <p className="text-sm mt-1">Fully customizable and production-ready</p>
      </div>
    </div>
  );
};

export default EmojiFeedbackDemo;