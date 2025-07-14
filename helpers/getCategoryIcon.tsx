import { Category } from "@/interface/subscription.interface";
import { Ionicons } from "@expo/vector-icons";

export const getCategoryIcon = (category: Category): keyof typeof Ionicons.glyphMap => {
    switch (category) {
        case 'Music':
            return 'musical-notes-outline';
        case 'Entertainment':
            return 'tv-outline';
        case 'Services':
            return 'cog-outline';
        case 'Productivity':
            return 'briefcase-outline';
        case 'Gaming':
            return 'game-controller-outline';
        default:
            return 'apps-outline'; 
    }
}