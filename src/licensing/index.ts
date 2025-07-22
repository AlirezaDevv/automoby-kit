import LicenseManager, { LicenseConfig } from './LicenseManager';

/**
 * Initialize Automoby Kit with your license key
 * This function must be called before using any components
 *
 * @param config - License configuration
 * @returns boolean indicating success
 *
 * @example
 * ```typescript
 * import { initializeAutomobiKit } from 'automoby-kit';
 *
 * // Initialize with your license key
 * const success = initializeAutomobiKit({
 *   key: 'your-license-key-here',
 *   domain: 'yourdomain.com', // optional
 *   environment: 'production' // optional
 * });
 *
 * if (success) {
 *   // Now you can use components
 * }
 * ```
 */
export function initializeAutomobiKit(config: LicenseConfig): boolean {
  const licenseManager = LicenseManager.getInstance();
  return licenseManager.initialize(config);
}

/**
 * Check if components can be used
 */
export function canUseComponents(): boolean {
  const licenseManager = LicenseManager.getInstance();
  return licenseManager.canUseComponents();
}

export type { LicenseConfig };
