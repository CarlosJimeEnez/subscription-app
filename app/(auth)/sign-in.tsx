import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Page() {
  const safeArea = useSafeAreaInsets()
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View className='flex-1 p-6 bg-background' style={{ paddingTop: safeArea.top + 20 }}>
      <View className="mt-8 mb-10">
        <Text className='text-white text-3xl font-bold mb-2'>Sign in</Text>
        <Text className='text-gray-400'>Inicia sesión para continuar</Text>
      </View>
      
      <View className="space-y-7">
        <View>
          <Text className="text-white text-base mb-2">Email</Text>
          <TextInput
            className='bg-[#1C1F30] h-16 rounded-xl text-white p-5'
            placeholderTextColor="#6B7280"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter your email"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>
        
        <View>
          <Text className="text-white text-base mb-2">Password</Text>
          <TextInput
            className='bg-[#1C1F30] h-16 rounded-xl text-white p-5'
            placeholderTextColor="#6B7280"
            value={password}
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        
        <TouchableOpacity 
          className="bg-[#3461FD] h-16 rounded-2xl items-center justify-center mt-7"
          onPress={onSignInPress}>
          <Text className='text-white text-lg font-semibold'>Continue</Text>
        </TouchableOpacity>
        
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-400 mr-2">¿No tienes una cuenta? </Text>
          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity>
              <Text className="text-[#3461FD]">Regístrate</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
}