import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CircleFadingPlus, CirclePlus } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
    clasName?: string
}

function FAB({ clasName }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(50)).current;

    const toggleMenu = () => {
        const toValue = isOpen ? 0 : 1;

        Animated.parallel([
            Animated.timing(rotateAnim, {
                toValue,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: isOpen ? 50 : 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();

        setIsOpen(!isOpen);
    };

    const handleOptionPress = (route: string) => {
        toggleMenu();
        setTimeout(() => {
            router.push(route);
        }, 150);
    };

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '135deg'],
    });

    return (
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 50 }]} pointerEvents="box-none">
            {/* Overlay semitransparente */}
            {isOpen && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFillObject,
                        { backgroundColor: 'rgba(0,0,0,0.5)', opacity: opacityAnim }
                    ]}
                    pointerEvents="auto"
                >
                    <Pressable style={{ flex: 1 }} onPress={toggleMenu} />
                </Animated.View>
            )}

            {/* Contenedor del FAB y opciones (arriba del overlay) */}
            <View className='absolute flex flex-col items-end justify-end bottom-5 right-5'>
                {/* Opciones del menú */}
                <Animated.View
                    style={{
                        opacity: opacityAnim,
                        transform: [{ translateY: translateYAnim }],
                        marginBottom: 16,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    className='space-y-3'
                    pointerEvents={isOpen ? 'auto' : 'none'}
                >
                    {/* Agregar Gasto */}
                    <Pressable
                        onPress={() => handleOptionPress('/expense/add')}
                        className='rounded-xl w-40 h-14 items-center justify-center mb-3 px-4'
                    >
                        <View className='flex-row items-center justify-end gap-2'>
                            <Text className='text-text text-xl text-center'>Nuevo Gasto</Text>
                            <View className='bg-text rounded-full flex-row items-center p-2 justify-center gap-2'>
                                <CirclePlus size={32} color="green" />
                            </View>
                        </View>
                    </Pressable>

                    {/* Agregar Suscripción */}
                    <Pressable
                        onPress={() => handleOptionPress('/subscription/add')}
                        className=' rounded-xl w-40 h-14 items-center justify-center px-4'
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 8,
                            elevation: 5,
                        }}
                    >
                        <View className='flex-row items-center justify-end gap-2'>
                            <Text className='text-text text-xl text-center'>Nueva Suscripción</Text>
                            <View className=' bg-text rounded-full flex-row items-center p-2 justify-center gap-2'>
                                <CircleFadingPlus size={32} color="green" />
                            </View>
                        </View>
                    </Pressable>
                </Animated.View>

                {/* Botón principal FAB */}
                <Pressable
                    onPress={toggleMenu}
                    className='bg-green-700 rounded-full w-20 h-20 items-center justify-center'
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 8,
                        elevation: 5,
                    }}
                >
                    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                        <AntDesign name="plus" size={28} color="white" />
                    </Animated.View>
                </Pressable>
            </View>
        </View>
    )
}

export default FAB