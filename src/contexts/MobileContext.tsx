import { createContext, ReactNode } from 'react';
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

export default MobileContext;
