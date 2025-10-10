import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const useHeader = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = useCallback(() => {
    setMobileDrawerOpen(prev => !prev);
  }, []);

  const closeDrawer = useCallback(() => {
    setMobileDrawerOpen(false);
  }, []);

  const navigateToTab = useCallback((tabId: string) => {
    router.push(`/dashboard/${tabId}`);
    closeDrawer();
  }, [router, closeDrawer]);

  return {
    mobileDrawerOpen,
    toggleDrawer,
    closeDrawer,
    navigateToTab,
  };
};