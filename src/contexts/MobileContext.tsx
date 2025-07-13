import { createContext, useMemo, ReactNode } from 'react';
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
  // const context = useContext(MobileContext);
  // if (context === undefined) {
  //   throw new Error('useMobile must be used within a MobileProvider');
  // }
  const context = {
    isMobile: isMobile || false,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  };
  return context;
};

export default MobileContext;
