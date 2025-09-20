import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useEffect,
  useState,
} from 'react';
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

const detectDeviceByScreenWidth = (): {
  isMobile: boolean;
  isTablet: boolean;
} => {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTablet: false };
  }

  const width = window.innerWidth;

  if (width >= 1200) {
    return { isMobile: false, isTablet: false };
  }
  if (width >= 900) {
    return { isMobile: false, isTablet: true };
  }
  return { isMobile: true, isTablet: false };
};

export const MobileProvider = ({
  userAgent,
  children,
}: MobileProviderProps) => {
  // Server-side detection from user agent (for SSR)
  const serverDetection = detectDevice(userAgent);

  // Client-side detection state
  const [clientDetection, setClientDetection] = useState(() =>
    detectDeviceByScreenWidth(),
  );

  // Update client detection on window resize
  useEffect(() => {
    const handleResize = () => {
      setClientDetection(detectDeviceByScreenWidth());
    };

    // Set initial client detection
    setClientDetection(detectDeviceByScreenWidth());

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Combine server and client detection
  // Use server detection initially (for SSR), then client detection takes over
  const isMobile =
    typeof window !== 'undefined'
      ? clientDetection.isMobile
      : serverDetection.isMobile;
  const isTablet =
    typeof window !== 'undefined'
      ? clientDetection.isTablet
      : serverDetection.isTablet;

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
