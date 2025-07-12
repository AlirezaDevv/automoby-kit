import { createContext, useContext, useMemo, ReactNode } from 'react';

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
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
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

export const useMobile = (): MobileContextValue => {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobile must be used within a MobileProvider');
  }
  return context;
};

export default MobileContext;
