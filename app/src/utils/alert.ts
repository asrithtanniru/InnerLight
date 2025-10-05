// src/utils/alert.ts
// This is a simple alert replacement utility for quick migration from Alert.alert
// For components, it's better to use the useCustomAlert hook directly

interface AlertButton {
  text?: string
  onPress?: () => void
  style?: 'default' | 'cancel' | 'destructive'
}

class AlertManager {
  private static instance: AlertManager
  private showAlertCallback: ((config: any) => void) | null = null

  static getInstance(): AlertManager {
    if (!AlertManager.instance) {
      AlertManager.instance = new AlertManager()
    }
    return AlertManager.instance
  }

  setShowAlertCallback(callback: (config: any) => void) {
    this.showAlertCallback = callback
  }

  alert(title: string, message?: string, buttons?: AlertButton[], options?: { cancelable?: boolean }) {
    if (!this.showAlertCallback) {
      console.warn('Alert callback not set. Make sure to initialize AlertManager in your app.')
      return
    }

    // Simple case - just OK button
    if (!buttons || buttons.length === 0) {
      this.showAlertCallback({
        title,
        message: message || '',
        type: 'info',
      })
      return
    }

    // Single button
    if (buttons.length === 1) {
      this.showAlertCallback({
        title,
        message: message || '',
        type: 'info',
        confirmText: buttons[0].text || 'OK',
        onConfirm: buttons[0].onPress,
      })
      return
    }

    // Two buttons - assume cancel and confirm
    const cancelButton = buttons.find((b) => b.style === 'cancel') || buttons[0]
    const confirmButton = buttons.find((b) => b.style !== 'cancel') || buttons[1]

    this.showAlertCallback({
      title,
      message: message || '',
      type: confirmButton.style === 'destructive' ? 'warning' : 'info',
      showCancel: true,
      cancelText: cancelButton.text || 'Cancel',
      confirmText: confirmButton.text || 'OK',
      onConfirm: confirmButton.onPress,
      onCancel: cancelButton.onPress,
    })
  }
}

export const Alert = {
  alert: (title: string, message?: string, buttons?: AlertButton[], options?: { cancelable?: boolean }) => {
    AlertManager.getInstance().alert(title, message, buttons, options)
  },
}

export const initializeAlertManager = (showAlertCallback: (config: any) => void) => {
  AlertManager.getInstance().setShowAlertCallback(showAlertCallback)
}
