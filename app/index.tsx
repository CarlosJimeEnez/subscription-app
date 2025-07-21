import { SignOutButton } from '@/components/auth/SignOutButton'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link, Redirect } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const Index = () => {
  const { top } = useSafeAreaInsets()
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  
  // Wait for auth to be loaded before deciding where to redirect
  if (!isLoaded) {
    return <View className='flex-1 bg-[#101323]' style={{ paddingTop: top }} />
  }
  
  // If user is not authenticated, redirect to sign-in page
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }

  // If authenticated, redirect to home
  return (
    <View>
      <SignedIn>
        <View className='flex-1 bg-[#101323]' style={{ paddingTop: top }}>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <Redirect href="/(tabs)/home" />
        </View>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}

export default Index