# Automoby Kit

A comprehensive React UI component library - created in war 2025.

## 🚀 Installation

```bash
npm install automoby-kit
```

## 📦 Usage

```typescript
import { 
  Button, 
  Typography, 
  Input, 
  Tabs
} from 'automoby-kit';

function App() {
  return (
    <div>
      <Typography variant="h1">Welcome to Automoby Kit</Typography>
      <Button variant="primary" size="lg">
        Click me!
      </Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
```

## 🧩 Available Components

- **Typography** - Text rendering with various styles
- **Button** - Interactive buttons with multiple variants
- **Input** - Form input fields
- **Tabs** - Tabbed interfaces
- **Drawer** - Slide-out panels
- **Backdrop** - Modal overlays
- **Breadcrumb** - Navigation breadcrumbs
- **Pagination** - Page navigation
- **Accordion** - Collapsible content sections
- **Divider** - Visual separators
- **RadioGroup** - Radio button groups
- **Chips** - Tag-like elements
- **Menu** - Context menus and dropdowns

## 🏗️ TypeScript Support

All components come with full TypeScript support:

```typescript
import { ButtonProps, TypographyVariant } from 'automoby-kit';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 📱 Mobile Context

The library includes a mobile detection context:

```typescript
import { MobileProvider } from 'automoby-kit';

function App() {
  return (
    <MobileProvider userAgent={navigator.userAgent}>
      <MyComponent />
    </MobileProvider>
  );
}
```

## 🛠️ Development

This package requires the following peer dependencies:

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "clsx": "^2.1.1",
  "tailwindcss": "^4.1.10"
}
```

## 🆘 Support

If you have issues:

1. Check the [GitHub issues](https://github.com/yourusername/automoby-kit/issues) for known problems
2. Submit a new issue with detailed information about your problem

## 🔄 Version History

- **1.0.0** - Initial release 