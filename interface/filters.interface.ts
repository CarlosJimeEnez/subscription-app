import { Ionicons } from '@expo/vector-icons';

export interface FilterOption {
    id: string;
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
}
