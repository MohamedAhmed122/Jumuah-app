import { useCallback, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

export function useTvMenu(canStayOpen: boolean) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!canStayOpen) setMenuOpen(false);
  }, [canStayOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setMenuOpen(false);
      return true;
    });
    return () => subscription.remove();
  }, [menuOpen]);

  return { menuOpen: menuOpen && canStayOpen, openMenu, closeMenu };
}
