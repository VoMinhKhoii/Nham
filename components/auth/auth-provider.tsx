'use client';

import { createContext, useCallback, useContext, useState } from 'react';

export type AuthTab = 'sign-in' | 'sign-up';

interface AuthDialogContextValue {
  open: boolean;
  tab: AuthTab;
  openDialog: (tab?: AuthTab) => void;
  closeDialog: () => void;
  setTab: (tab: AuthTab) => void;
}

const AuthDialogContext = createContext<AuthDialogContextValue | null>(null);

export function useAuthDialog() {
  const ctx = useContext(AuthDialogContext);
  if (!ctx) {
    throw new Error('useAuthDialog must be used within AuthProvider');
  }
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<AuthTab>('sign-in');

  const openDialog = useCallback((t: AuthTab = 'sign-up') => {
    setTab(t);
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <AuthDialogContext.Provider
      value={{ open, tab, openDialog, closeDialog, setTab }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
}
