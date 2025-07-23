# Automoby Kit

A comprehensive React UI component library with built-in licensing system.

## 🚀 Installation

```bash
npm install automoby-kit
```

## 🔑 License Initialization (Required)

**Important**: You must initialize Automoby Kit with a valid license key before using any components.

```typescript
import { initializeAutomobiKit } from 'automoby-kit';

// Initialize with your license key (call this once at the start of your app)
const success = initializeAutomobiKit({
  key: 'your-license-key-here'
});

if (success) {
  console.log('✅ Automoby Kit initialized successfully');
} else {
  console.error('❌ Failed to initialize Automoby Kit');
}
```
## 📦 Usage

After successful initialization, you can use any component:

```typescript
import { 
  Button, 
  Typography, 
  Input, 
  Tabs,
  initializeAutomobiKit 
} from 'automoby-kit';

// Initialize first
initializeAutomobiKit({
  key: '-------------------'
});

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

## 🔧 License Management Functions

```typescript
import { 
  initializeAutomobiKit, 
  getLicenseStatus, 
  canUseComponents 
} from 'automoby-kit';

// Check if components can be used
const canUse = canUseComponents();

// Get detailed license status
const status = getLicenseStatus();
console.log(status);
// {
//   initialized: true,
//   valid: true,
//   key: "automoby-..."
// }
```

## ⚠️ What Happens Without a Valid License?

If you try to use components without proper initialization or with an invalid key, you'll see a license error component instead of the actual component:

```
🔒 License Required
Component "Button" requires a valid license key.
Please initialize Automoby Kit with your license key before using components.
```

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

## 📄 License

This is a commercial package. You need a valid license key to use it in production.

## 🆘 Support

If you need a license key or have issues:

1. Contact our sales team for licensing
2. Check the [GitHub issues](https://github.com/yourusername/automoby-kit/issues) for known problems
3. Make sure you're calling `initializeAutomobiKit()` before using any components

## 🔄 Version History

- **1.0.0** - Initial release with licensing system 