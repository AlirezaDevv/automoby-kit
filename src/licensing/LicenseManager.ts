/**
 * License Manager for Automoby Kit
 * Handles runtime key validation and component access control
 */

export interface LicenseConfig {
  key: string;
}

class LicenseManager {
  private static instance: LicenseManager;

  private isInitialized = false;

  private isValid = false;

  private licenseKey: string | null = null;

  // Valid license keys - in production, these would be validated against your backend
  private validKeys = ['automoby-kit-war-key-2025'];

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): LicenseManager {
    if (!LicenseManager.instance) {
      LicenseManager.instance = new LicenseManager();
    }
    return LicenseManager.instance;
  }

  /**
   * Initialize the license with provided configuration
   */
  public initialize(config: LicenseConfig): boolean {
    try {
      this.licenseKey = config.key;

      // Validate the license key
      this.isValid = this.validateLicense(config.key);
      this.isInitialized = true;

      if (this.isValid) {
        console.log('✅ Automoby Kit initialized successfully');
        return true;
      }
      console.error('❌ Invalid license key provided for Automoby Kit');
      return false;
    } catch (error) {
      console.error('❌ Failed to initialize Automoby Kit:', error);
      this.isValid = false;
      this.isInitialized = true;
      return false;
    }
  }

  /**
   * Validate license key (in production, this would call your backend)
   */
  private validateLicense(key: string): boolean {
    // Basic validation - empty key is invalid
    if (!key || key.trim() === '') {
      return false;
    }

    // For demo purposes, we're using hardcoded keys
    // In production, you would validate against your backend API
    return this.validKeys.includes(key);
  }

  /**
   * Check if the license is valid and components can be used
   */
  public canUseComponents(): boolean {
    if (!this.isInitialized) {
      console.error(
        '❌ Automoby Kit not initialized. Please call initializeAutomobiKit() with your license key.',
      );
      return false;
    }

    if (!this.isValid) {
      console.error(
        '❌ Invalid license key. Please contact support or provide a valid license key.',
      );
      return false;
    }

    return true;
  }

  /**
   * Get current license status
   */
  public getLicenseStatus(): {
    initialized: boolean;
    valid: boolean;
    key: string | null;
  } {
    return {
      initialized: this.isInitialized,
      valid: this.isValid,
      key: this.licenseKey ? `${this.licenseKey.substring(0, 8)}...` : null,
    };
  }

  /**
   * Reset license state (useful for testing)
   */
  public reset(): void {
    this.isInitialized = false;
    this.isValid = false;
    this.licenseKey = null;
  }
}

export default LicenseManager;
