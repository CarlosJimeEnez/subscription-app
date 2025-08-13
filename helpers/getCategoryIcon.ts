import { Ionicons } from "@expo/vector-icons"

export const getCategoryIcon = (category: string): keyof typeof Ionicons.glyphMap => {
    switch (category.toLowerCase()) {
        case 'alimentos':
            return 'restaurant-outline'
        case 'transporte':
            return 'car-outline'
        case 'salud':
            return 'medical-outline'
        case 'entretenimiento':
            return 'game-controller-outline'
        case 'productividad':
            return 'laptop-outline'
        case 'otros':
        default:
            return 'ellipsis-horizontal-outline'
    }
}