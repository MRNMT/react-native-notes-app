import { View, Text, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { Trash2, Pin } from "lucide-react-native";
import { CategoryBadge } from "./CategoryBadge";
import { styled } from "nativewind";
import type { Database } from "@/integrations/supabase/types";

type Note = Database["public"]["Tables"]["notes"]["Row"];

const StyledView = styled(View);
const StyledText = styled(Text);

interface NoteCardProps {
    note: Note;
    onClick: () => void;
    onDelete: () => void;
}

export function NoteCard({ note, onClick, onDelete }: NoteCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={note.title || 'Note'}
            className="bg-white rounded-xl p-4 mb-3 border border-gray-200 shadow-sm"
            onPress={onClick}
        >
            <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1 mr-2">
                    <View className="flex-row items-center gap-2 mb-2">
                        <CategoryBadge category={note.category} />
                        {note.is_pinned && <Pin size={14} color="#4f46e5" fill="#4f46e5" />}
                    </View>
                    <StyledText className="text-lg font-semibold text-gray-900 mb-1" numberOfLines={1}>
                        {note.title || "Untitled Note"}
                    </StyledText>
                </View>
                <TouchableOpacity
                    onPress={(e) => {
                        // e.stopPropagation(); // React Native doesn't strictly need this like Web if hit slop is handled, but good practice if nested
                        onDelete();
                    }}
                    className="p-2 -mr-2 -mt-2"
                >
                    <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>

            <StyledText className="text-gray-600 mb-3 leading-5" numberOfLines={3}>
                {note.content}
            </StyledText>

            <StyledText className="text-xs text-gray-400">
                {format(new Date(note.updated_at), "MMM d, yyyy")}
            </StyledText>
        </TouchableOpacity>
    );
}
