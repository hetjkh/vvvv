# Dashboard Components

This directory contains modularized components for the dating profile dashboard. The original large `page.js` file has been broken down into smaller, more manageable components.

## Component Structure

### Core Components

- **`ProfileHero.jsx`** - The main hero section with profile information, image, and call-to-action
- **`BioSection.jsx`** - About me section with bio, personality traits, and relationship preferences
- **`InterestsSection.jsx`** - Interests and hobbies section with various layout options
- **`GallerySection.jsx`** - Photo gallery section using the CircularGallery component
- **`FooterSection.jsx`** - Contact information and social media links
- **`ControlPanel.jsx`** - Settings panel for customizing the profile appearance
- **`SectionReorderControls.jsx`** - Controls for reordering dashboard sections

### Utility Components

- **`Badge.jsx`** - Reusable badge component with different variants
- **`Glow.jsx`** - Background glow effect component
- **`utils.js`** - Common utility functions and constants

### Index Files

- **`index.js`** - Exports all components for easy importing
- **`README.md`** - This documentation file

## Usage

### Importing Components

```javascript
// Import individual components
import { ProfileHero, BioSection, ControlPanel } from '../../components/dashboard';

// Or import from the index file
import {
  ProfileHero,
  BioSection,
  InterestsSection,
  GallerySection,
  FooterSection,
  ControlPanel,
  SectionReorderControls
} from '../../components/dashboard';
```

### Using Utilities

```javascript
import { cn, presetColors, designPresets } from '../../components/dashboard';

// Use utility functions
const className = cn('base-class', condition && 'conditional-class');

// Use preset data
const colors = presetColors;
const presets = designPresets;
```

## Component Props

### ProfileHero
- `placeName` - Profile name
- `slogan` - Profile tagline
- `location` - User location
- `age` - User age
- `lookingFor` - Relationship preferences
- `verified` - Verification status
- `imageUrl` - Profile image URL
- `backgroundColor` - Background color
- `gradientEnabled` - Enable gradient background
- `gradientDirection` - Gradient direction
- `gradientColors` - Gradient colors array
- `textColor` - Text color
- `sloganColor` - Slogan text color
- `imageShape` - Image shape (circle, square, etc.)
- `imageBackgroundColor` - Image background color
- `badgeColor` - Badge background color
- `buttonColor` - CTA button color
- `glowEnabled` - Enable glow effects
- `glowPrimaryColor` - Primary glow color
- `glowSecondaryColor` - Secondary glow color
- `fontFamily` - Font family

### BioSection
- `settings` - Object containing all bio section settings
  - `backgroundColor` - Background color
  - `gradientEnabled` - Enable gradient background
  - `gradientDirection` - Gradient direction
  - `gradientColors` - Gradient colors array
  - `textColor` - Text color
  - `fontFamily` - Font family
  - `designType` - Layout type (card, split, timeline, mosaic)
  - `bio` - Bio text content
  - `personality` - Array of personality traits
  - `relationshipType` - Relationship preferences text

### InterestsSection
- `settings` - Object containing all interests section settings
  - `backgroundColor` - Background color
  - `gradientEnabled` - Enable gradient background
  - `gradientDirection` - Gradient direction
  - `gradientColors` - Gradient colors array
  - `textColor` - Text color
  - `fontFamily` - Font family
  - `designType` - Layout type (cards, grid, masonry, carousel)
  - `interests` - Array of interest items

### GallerySection
- `textColor` - Text color
- `fontFamily` - Font family
- `backgroundColor` - Background color
- `gradientEnabled` - Enable gradient background
- `gradientDirection` - Gradient direction
- `gradientColors` - Gradient colors array
- `gallerySettings` - Gallery-specific settings
  - `bend` - Gallery bend value
  - `borderRadius` - Border radius value

### FooterSection
- `settings` - Object containing all footer section settings
  - `backgroundColor` - Background color
  - `gradientEnabled` - Enable gradient background
  - `gradientDirection` - Gradient direction
  - `gradientColors` - Gradient colors array
  - `textColor` - Text color
  - `fontFamily` - Font family
  - `designType` - Layout type (modern, minimal, split, cards)
  - `footerText` - Footer message text
  - `contactInfo` - Contact information object
  - `socialLinks` - Array of social media links

### ControlPanel
- `isOpen` - Panel open/close state
- `onToggle` - Toggle function
- `settings` - All section settings
- `onSettingsChange` - Settings change handler
- `onApplyPreset` - Preset application handler

### SectionReorderControls
- `isOpen` - Controls open/close state
- `onToggle` - Toggle function
- `sectionOrder` - Current section order array
- `onReorderSection` - Section reorder handler

## Benefits of Modularization

1. **Maintainability** - Each component has a single responsibility
2. **Reusability** - Components can be reused across different parts of the application
3. **Testability** - Individual components can be tested in isolation
4. **Readability** - Code is easier to understand and navigate
5. **Collaboration** - Multiple developers can work on different components simultaneously
6. **Performance** - Components can be optimized individually
7. **Scalability** - Easy to add new features or modify existing ones

## File Organization

```
src/components/dashboard/
├── ProfileHero.jsx          # Main hero section
├── BioSection.jsx           # About me section
├── InterestsSection.jsx     # Interests section
├── GallerySection.jsx       # Gallery section
├── FooterSection.jsx        # Footer section
├── ControlPanel.jsx         # Settings panel
├── SectionReorderControls.jsx # Section reorder controls
├── Badge.jsx               # Badge component
├── Glow.jsx                # Glow effect component
├── utils.js                # Utility functions and constants
├── index.js                # Component exports
└── README.md               # This documentation
```

## Migration Notes

The original `page.js` file contained all components in a single file. This modular approach:

- Separates concerns into logical components
- Makes the codebase more maintainable
- Improves developer experience
- Enables better code organization
- Facilitates future enhancements

Each component is now self-contained with its own imports, logic, and styling, making it easier to modify, test, and reuse. 