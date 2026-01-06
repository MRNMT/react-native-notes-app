import { View, Text } from "react-native";
import { Briefcase, GraduationCap, Heart, Tag } from "lucide-react-native";
import { styled } from "nativewind";

// Map known categories to their colors/icons - Using softer pastel backgrounds and vibrant icons
const categoryMap: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
    work: { label: "Work", icon: Briefcase, color: "#3b82f6", bg: "#eff6ff" }, // Blue
    study: { label: "Study", icon: GraduationCap, color: "#10b981", bg: "#ecfdf5" }, // Emerald 
    personal: { label: "Personal", icon: Heart, color: "#ec4899", bg: "#fdf2f8" }, // Pink
};

const defaultCategoryStyle = { icon: Tag, color: "#6366f1", bg: "#eef2ff" }; // Indigo

const StyledView = styled(View);
const StyledText = styled(Text);

export function CategoryBadge({ category }: { category: string }) {
    const normalizedCat = category?.toLowerCase() || "personal";
    const config = categoryMap[normalizedCat] || {
        ...defaultCategoryStyle,
        label: category.charAt(0).toUpperCase() + category.slice(1)
    };

    const Icon = config.icon;

    return (
        <View
            style={{ backgroundColor: config.bg, alignSelf: 'flex-start' }}
            className="flex-row items-center px-2.5 py-1 rounded-md"
        >
            <Icon size={12} color={config.color} />
            <Text style={{ color: config.color }} className="ml-1.5 text-xs font-semibold tracking-wide">
                {config.label}
            </Text>
        </View>
    );
}
