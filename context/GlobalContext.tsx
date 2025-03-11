'use client';

import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { useSession } from 'next-auth/react';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// Define context type
interface GlobalContextType {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

// Initialize context with undefined to handle missing providers safely
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider component
interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);
  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook to use the context
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}
