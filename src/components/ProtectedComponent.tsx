import React from 'react';
import { canUseComponents } from '../licensing';

/**
 * Higher-order component that protects components with license validation
 */
export function withLicenseProtection<T extends object>(
  Component: React.ComponentType<T>,
  componentName: string,
) {
  const ProtectedComponent = React.forwardRef<unknown, T>((props, ref) => {
    if (!canUseComponents()) {
      // Return a placeholder component with error styling
      return (
        <div
          style={{
            padding: '16px',
            border: '2px dashed #ef4444',
            borderRadius: '8px',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '14px',
            maxWidth: '400px',
            margin: '16px auto',
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            🔒 License Required
          </div>
          <div style={{ marginBottom: '8px' }}>
            Component &quot;{componentName}&quot; requires a valid license key.
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            Please initialize Automoby Kit with your license key before using
            components.
          </div>
        </div>
      );
    }

    // If license is valid, render the actual component
    // Use type assertion to handle the generic component props properly
    return <Component {...(props as T)} ref={ref} />;
  });

  ProtectedComponent.displayName = `Protected(${componentName})`;

  return ProtectedComponent;
}
