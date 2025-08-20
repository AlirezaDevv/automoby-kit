import { createContext, ReactNode, useContext, useMemo } from 'react';
import { UAParser } from 'ua-parser-js';

interface MobileContextValue {
  isMobile: boolean;
  isTablet: boolean;
  userAgent: string;
}

interface MobileProviderProps {
  userAgent: string;
  children: ReactNode;
}

const MobileContext = createContext<MobileContextValue | undefined>(undefined);

const detectDevice = (
  userAgent: string,
): { isMobile: boolean; isTablet: boolean } => {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  return {
    isMobile: device.type === 'mobile',
    isTablet: device.type === 'tablet',
  };
};

export const MobileProvider = ({
  userAgent,
  children,
}: MobileProviderProps) => {
  // 3. هر دو مقدار محاسبه می‌شوند
  const { isMobile, isTablet } = detectDevice(userAgent);

  const value: MobileContextValue = useMemo(
    () => ({
      isMobile,
      isTablet,
      userAgent,
    }),
    [isMobile, isTablet, userAgent],
  );
  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
};

export const useMobile = (): boolean => {
  if (process.env.STORYBOOK_FORCE_MOBILE === 'true') {
    return true;
  }
  if (process.env.STORYBOOK_FORCE_MOBILE === 'false') {
    return false;
  }
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobile must be used within a MobileProvider');
  }
  return context.isMobile;
};

export const useTablet = (): boolean => {
  if (process.env.STORYBOOK_FORCE_MOBILE === 'true') {
    return false;
  }

  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useTablet must be used within a MobileProvider');
  }
  return context.isTablet;
};

export default MobileContext;
