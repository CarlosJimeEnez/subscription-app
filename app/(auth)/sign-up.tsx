import { useOAuth, useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SignUpScreen() {
  const safeArea = useSafeAreaInsets()
  const { isLoaded, signUp, setActive: setSignUpActive } = useSignUp()
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })
  const router = useRouter()
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false)

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle Google Sign Up
  const onGoogleSignUp = React.useCallback(async () => {
    try {
      if (!startOAuthFlow) {
        console.error('OAuth flow not initialized');
        return;
      }
      
      setIsGoogleLoading(true);
      const result = await startOAuthFlow();
      
      if (result && result.createdSessionId && setSignUpActive) {
        await setSignUpActive({ session: result.createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error("OAuth error:", err);
    } finally {
      setIsGoogleLoading(false);
    }
  }, [startOAuthFlow, setSignUpActive, router]);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete' && setSignUpActive) {
        await setSignUpActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View className='flex-1 p-6 bg-background' style={{ paddingTop: safeArea.top + 20 }}>
        <View className="mt-8 mb-10">
          <Text className='text-white text-3xl font-bold mb-2'>Verificación</Text>
          <Text className='text-gray-400'>Ingresa el código que te enviamos por email</Text>
        </View>
        
        <View className="space-y-7">
          <View>
            <Text className="text-white text-base mb-2">Código</Text>
            <TextInput
              className='bg-[#1C1F30] h-16 rounded-xl text-white p-5'
              placeholderTextColor="#6B7280"
              value={code}
              placeholder="Ingresa el código de verificación"
              onChangeText={(code) => setCode(code)}
            />
          </View>
          
          <TouchableOpacity 
            className="bg-[#3461FD] h-16 rounded-2xl items-center justify-center mt-7"
            onPress={onVerifyPress}>
            <Text className='text-white text-lg font-semibold'>Verificar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View className='flex-1 p-6 bg-background' style={{ paddingTop: safeArea.top + 20 }}>
      <View className="mt-8 mb-10">
        <Text className='text-white text-3xl font-bold mb-2'>Regístrate</Text>
        <Text className='text-gray-400'>Crea una cuenta nueva para continuar</Text>
      </View>
      
      <View className="space-y-7">
        <View>
          <Text className="text-white text-base mb-2">Email</Text>
          <TextInput
            className='bg-[#1C1F30] h-16 rounded-xl text-white p-5'
            placeholderTextColor="#6B7280"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Ingresa tu email"
            onChangeText={(email) => setEmailAddress(email)}
          />
        </View>
        
        <View>
          <Text className="text-white text-base mb-2">Contraseña</Text>
          <TextInput
            className='bg-[#1C1F30] h-16 rounded-xl text-white p-5'
            placeholderTextColor="#6B7280"
            value={password}
            placeholder="Crea una contraseña segura"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        
        <TouchableOpacity 
          className="bg-[#3461FD] h-16 rounded-2xl items-center justify-center mt-7"
          onPress={onSignUpPress}>
          <Text className='text-white text-lg font-semibold'>Continuar</Text>
        </TouchableOpacity>
        
        <View className="flex-row items-center my-5">
          <View className="flex-1 h-0.5 bg-[#1C1F30]" />
          <Text className="mx-4 text-gray-400">O continuar con</Text>
          <View className="flex-1 h-0.5 bg-[#1C1F30]" />
        </View>
        
        <TouchableOpacity 
          className="h-16 rounded-2xl border border-gray-700 flex-row items-center justify-center px-4"
          onPress={onGoogleSignUp}
          disabled={isGoogleLoading}>
          {isGoogleLoading ? (
            <ActivityIndicator color="#3461FD" />
          ) : (
            <>
              <Image 
                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
              <Text className="text-white text-base ml-3">Continuar con Google</Text>
            </>
          )}
        </TouchableOpacity>
        
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-400 mr-2">¿Ya tienes una cuenta? </Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity>
              <Text className="text-[#3461FD]">Inicia sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
}