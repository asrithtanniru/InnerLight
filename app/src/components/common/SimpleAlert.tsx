// src/components/common/SimpleAlert.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

interface SimpleAlertProps {
  visible: boolean
  title: string
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
}

const SimpleAlert: React.FC<SimpleAlertProps> = ({ visible, title, message, type = 'info', onClose, onConfirm, confirmText = 'OK', cancelText = 'Cancel', showCancel = false }) => {
  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle'
      case 'error':
        return 'alert-circle'
      case 'warning':
        return 'warning'
      default:
        return 'information-circle'
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return '#10B981'
      case 'error':
        return '#EF4444'
      case 'warning':
        return '#F59E0B'
      default:
        return '#8B5CF6'
    }
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  if (!visible) {
    return null
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons name={getIconName()} size={48} color={getIconColor()} />
            </View>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Message */}
            <Text style={styles.message}>{message}</Text>

            {/* Buttons */}
            <View style={styles.buttonsContainer}>
              {showCancel && (
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  alertContainer: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    minWidth: 80,
  },
  confirmButton: {
    backgroundColor: '#8B5CF6',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
})

export default SimpleAlert
