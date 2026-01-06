import { View, TextInput } from "react-native";
import { styled } from "nativewind";
import { Search } from "lucide-react-native";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <StyledView className="flex-row items-center bg-gray-100 rounded-lg px-3 h-10 w-full">
            <Search size={16} color="#6b7280" />
            <StyledTextInput
                value={value}
                onChangeText={onChange}
                placeholder="Search notes..."
                className="flex-1 ml-2 text-sm text-gray-900 h-full"
                placeholderTextColor="#9ca3af"
            />
        </StyledView>
    );
}
