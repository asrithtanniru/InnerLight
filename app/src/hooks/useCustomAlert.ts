import { useState, useCallback } from 'react';

interface AlertConfig {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onConfirm?: () => void;
}

interface UseCustomAlertReturn {
  showAlert: (config: AlertConfig) => void;
  hideAlert: () => void;
  alertProps: {
    visible: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
    onConfirm?: () => void;
    confirmText: string;
    cancelText: string;
    showCancel: boolean;
  };
}

export const useCustomAlert = (): UseCustomAlertReturn => {
  const [alertState, setAlertState] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    confirmText: string;
    cancelText: string;
    showCancel: boolean;
    onConfirm: (() => void) | undefined;
  }>({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'OK',
    cancelText: 'Cancel',
    showCancel: false,
    onConfirm: undefined,
  });

  const showAlert = useCallback((config: AlertConfig) => {
    setAlertState({
      visible: true,
      title: config.title,
      message: config.message,
      type: config.type || 'info',
      confirmText: config.confirmText || 'OK',
      cancelText: config.cancelText || 'Cancel',
      showCancel: config.showCancel || false,
      onConfirm: config.onConfirm,
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlertState(prev => ({
      ...prev,
      visible: false,
    }));
  }, []);

  const alertProps = {
    ...alertState,
    onClose: hideAlert,
  };

  return {
    showAlert,
    hideAlert,
    alertProps,
  };
};
