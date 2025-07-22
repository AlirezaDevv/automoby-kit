import { createContext, useMemo, ReactNode, useContext } from 'react';
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

  // Consider mobile and tablet devices as mobile
  return device.type === 'mobile' || device.type === 'tablet';
};

export const MobileProvider: React.FC<MobileProviderProps> = ({
  userAgent,
  children,
}) => {
  const isMobile = detectMobile(userAgent);

  const value: MobileContextValue = useMemo(
    () => ({
      isMobile,
      userAgent,
    }),
    [isMobile, userAgent],
  );

  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
};

export const useMobile = (isMobile?: boolean): MobileContextValue => {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobile must be used within a MobileProvider');
  }
  return isMobile === undefined
    ? context
    : { isMobile, userAgent: context.userAgent };
};

export default MobileContext;
