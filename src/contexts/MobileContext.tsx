import { createContext, ReactNode, useContext } from 'react';
import { UAParser } from 'ua-parser-js';

interface MobileContextValue {
  isMobile: boolean;
  userAgent: string;
}

interface MobileProviderProps {
  userAgent: string;
  children: ReactNode;
}

const MobileContext = createContext<MobileContextValue | undefined>(undefined);

const detectMobile = (userAgent: string): boolean => {
  const parser = new UAParser();
  parser.setUA(userAgent);
  const device = parser.getDevice();
  return device.type === 'mobile' || device.type === 'tablet';
};

export const MobileProvider = ({
  userAgent,
  children,
}: MobileProviderProps) => {
  const isMobile = detectMobile(userAgent);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: MobileContextValue = {
    isMobile,
    userAgent,
  };

  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
};

export const useMobile = (): boolean => {
  // Check for Storybook environment variable first
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

export default MobileContext;
