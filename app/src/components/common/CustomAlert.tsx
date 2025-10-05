import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native'
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { Typography } from '../../utils/typography'

const { width, height } = Dimensions.get('window')
interface CustomAlertProps {
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

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, message, type = 'info', onClose, onConfirm, confirmText = 'OK', cancelText = 'Cancel', showCancel = false }) => {
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

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={styles.alertContent}>
            <View style={styles.contentContainer}>
              {/* Icon */}
              <View style={[styles.iconContainer, { backgroundColor: `${getIconColor()}15` }]}>
                <Ionicons name={getIconName()} size={40} color={getIconColor()} />
              </View>

              {/* Title */}
              <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
                {title}
              </Text>

              {/* Message */}
              <Text style={styles.message}>{message}</Text>

              {/* Buttons */}
              <View style={[styles.buttonsContainer, showCancel ? styles.buttonsRow : styles.buttonsSingle]}>
                {showCancel && (
                  <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose} activeOpacity={0.7}>
                    <Text style={styles.cancelButtonText} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                      {cancelText}
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={[styles.button, styles.confirmButton, !showCancel && styles.buttonFullWidth]} onPress={handleConfirm} activeOpacity={0.8}>
                  <Text style={styles.confirmButtonText} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                    {confirmText}
                  </Text>
                </TouchableOpacity>
              </View>
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
    maxWidth: 340,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  alertContent: {
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  contentContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    ...Typography.h3,
    fontSize: 20,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 26,
    paddingHorizontal: 8,
  },
  message: {
    ...Typography.body1,
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  buttonsContainer: {
    width: '100%',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonsSingle: {
    flexDirection: 'column',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonFullWidth: {
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  confirmButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  cancelButtonText: {
    ...Typography.button,
    color: '#4B5563',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
})

export default CustomAlert
