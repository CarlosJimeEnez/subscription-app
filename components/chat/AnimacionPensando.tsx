import React, { useEffect, useRef } from 'react'
import { Text, View, Animated, StyleSheet, Easing } from 'react-native'

interface Props {
    text?: string
    color?: string
    size?: number
}

const AnimacionPensando = ({text, color = '#6B7280', size = 8}: Props) => {
  // Referencias para las animaciones de cada punto
  const dot1Opacity = useRef(new Animated.Value(0.3)).current
  const dot2Opacity = useRef(new Animated.Value(0.3)).current
  const dot3Opacity = useRef(new Animated.Value(0.3)).current
  
  // Función para animar un punto
  const animateDot = (dot: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(dot, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease
      }),
      Animated.timing(dot, {
        toValue: 0.3,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease
      })
    ])
  }

  // Iniciar la animación cuando se monte el componente
  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.stagger(200, [
          animateDot(dot1Opacity),
          animateDot(dot2Opacity),
          animateDot(dot3Opacity)
        ])
      ).start()
    }

    startAnimation()
    return () => {
      // Detener animaciones al desmontar
      dot1Opacity.stopAnimation()
      dot2Opacity.stopAnimation()
      dot3Opacity.stopAnimation()
    }
  }, [])

  return (
    <View style={styles.container}>
      {text && <Text style={[styles.text, { color }]}>{text}</Text>}
      <View style={styles.dotsContainer}>
        <Animated.View 
          style={[styles.dot, { 
            opacity: dot1Opacity, 
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2
          }]} 
        />
        <Animated.View 
          style={[styles.dot, { 
            opacity: dot2Opacity, 
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2
          }]} 
        />
        <Animated.View 
          style={[styles.dot, { 
            opacity: dot3Opacity, 
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2
          }]} 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    fontSize: 14,
    marginRight: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    marginHorizontal: 2,
  }
})

export default AnimacionPensando