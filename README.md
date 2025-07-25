# React Emoji Feedback Component

A highly customizable React component for emoji-based ratings and feedback with smooth animations and multiple interaction modes.

[Full Documentation](https://evaficy.com/emoji-feedback-component/)

## Installation

```bash
npm install @evaficy/react-emoji-feedback
# or
yarn add @evaficy/react-emoji-feedback
```

## Quick Start

```jsx
import { EmojiFeedback } from '@evaficy/react-emoji-feedback';

function App() {
  return (
    <EmojiFeedback
      scale="satisfaction"
      title="How satisfied are you with our service?"
      onRatingChange={(rating, intensity, scale) => {
        console.log('Rating:', scale.labels[rating]);
      }}
    />
  );
}
```

## Key Features

- 🎭 **Multiple Predefined Scales**: happiness, satisfaction, effort, custom
- 🎨 **Fully Customizable**: Custom emojis, labels, and styling
- 📏 **Multiple Sizes**: small, medium, large
- 📐 **Layout Options**: horizontal, vertical
- ⚡ **Intensity Levels**: Optional sub-levels for more granular feedback
- 🎯 **Interactive**: Smooth animations and hover effects
- 📱 **Responsive**: Works on all screen sizes

## Basic Usage Examples

### Predefined Scale
```jsx
<EmojiFeedback 
  scale="happiness"
  title="How are you feeling today?"
/>
```

### Custom Scale
```jsx
<EmojiFeedback
  emojis={['🥶', '🙂', '🔥', '🚀', '🌟']}
  labels={['Cold', 'Okay', 'Hot', 'Amazing', 'Perfect']}
  title="Rate the temperature"
/>
```

### With Intensity Levels
```jsx
<EmojiFeedback
  scale="satisfaction"
  enableIntensity={true}
  onRatingChange={(rating, intensity, scale) => {
    console.log(`${scale.labels[rating]} - Level ${intensity}`);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scale` | string | `'happiness'` | Predefined scale: 'happiness', 'satisfaction', 'effort', 'custom' |
| `emojis` | array | `null` | Custom emoji array `['😞', '😟', '😐', '😊', '😍']` |
| `labels` | array | `null` | Custom labels array `['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy']` |
| `title` | string | `null` | Title displayed above the component |
| `size` | string | `'large'` | Size: 'small', 'medium', 'large' |
| `layout` | string | `'horizontal'` | Layout: 'horizontal', 'vertical' |
| `enableIntensity` | boolean | `false` | Enable intensity sub-levels |
| `showLabels` | boolean | `true` | Show emoji labels on hover/selection |
| `onRatingChange` | function | `null` | Callback: `(rating, intensity, scale) => {}` |

## Use Cases

- **Customer Satisfaction Surveys**
- **User Experience Feedback**
- **Product Reviews**
- **Mood Tracking**
- **Difficulty Assessment**
- **Quality Ratings**

## Requirements

- React 16.8+
- TailwindCSS (for styling)

## License

MIT License
