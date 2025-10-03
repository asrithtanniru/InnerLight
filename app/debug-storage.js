// Debug script to test program enrollment
import AsyncStorage from '@react-native-async-storage/async-storage'

// Test script to check what's stored
const debugStorage = async () => {
  try {
    console.log('=== DEBUGGING PROGRAM ENROLLMENT ===')

    // Check user profile
    const userProfile = await AsyncStorage.getItem('user_profile')
    console.log('User Profile:', userProfile ? JSON.parse(userProfile) : 'No profile found')

    // Check program progress entries
    const allKeys = await AsyncStorage.getAllKeys()
    const programKeys = allKeys.filter((key) => key.startsWith('program_progress_'))
    console.log('Program progress keys:', programKeys)

    for (const key of programKeys) {
      const progress = await AsyncStorage.getItem(key)
      console.log(`${key}:`, progress ? JSON.parse(progress) : 'No data')
    }
  } catch (error) {
    console.error('Debug error:', error)
  }
}

// Clear all data for fresh start
const clearAllData = async () => {
  try {
    await AsyncStorage.clear()
    console.log('All data cleared!')
  } catch (error) {
    console.error('Clear error:', error)
  }
}

export { debugStorage, clearAllData }
