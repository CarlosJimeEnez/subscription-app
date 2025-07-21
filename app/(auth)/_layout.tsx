import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  // Wait for auth to be loaded
  if (!isLoaded) {
    return null;
  }

  // If user is signed in, redirect to home page
  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  // Otherwise, allow access to auth screens
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#101323' }
      }}
    />
  )
}