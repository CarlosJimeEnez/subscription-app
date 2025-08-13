

export const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
        case 'alimentos':
            return '#FF6B6B'
        case 'transporte':
            return '#4ECDC4'
        case 'salud':
            return '#45B7D1'
        case 'entretenimiento':
            return '#96CEB4'
        case 'productividad':
            return '#FFEAA7'
        case 'otros':
        default:
            return '#DDA0DD'
    }
}