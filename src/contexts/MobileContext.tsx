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
  userAgent: string;
}

interface MobileProviderProps {
  userAgent: string;
  children: ReactNode;
}

const MobileContext = createContext<MobileContextValue | undefined>(undefined);

const detectDevice = (userAgent: string): boolean => {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  // On server: mobile OR tablet = isMobile true, otherwise false
  return device.type === 'mobile' || device.type === 'tablet';
};

const detectDeviceByScreenWidth = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const width = window.innerWidth;
  // On client: <1024px = isMobile true, otherwise false
  return width < 1024;
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
    typeof window !== 'undefined' ? clientDetection : serverDetection;

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

export default MobileContext;
