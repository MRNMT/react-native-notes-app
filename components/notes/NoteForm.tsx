import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, ScrollView } from "react-native";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Briefcase, GraduationCap, Heart, Pin, Tag, X } from "lucide-react-native";
import { styled } from "nativewind";
import type { Database } from "@/integrations/supabase/types";

type Note = Database["public"]["Tables"]["notes"]["Row"];

interface NoteFormProps {
    note?: Note | null;
    onSave: (data: { title?: string; content: string; category: string; is_pinned: boolean }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const defaultCategories = [
    { value: "work", label: "Work", icon: Briefcase, color: "#2563eb", bg: "#dbeafe" },
    { value: "study", label: "Study", icon: GraduationCap, color: "#16a34a", bg: "#dcfce7" },
    { value: "personal", label: "Personal", icon: Heart, color: "#db2777", bg: "#fce7f3" },
];

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export function NoteForm({ note, onSave, onCancel, isLoading }: NoteFormProps) {
    const [title, setTitle] = useState(note?.title ?? "");
    const [content, setContent] = useState(note?.content ?? "");
    const [category, setCategory] = useState<string>(note?.category ?? "personal");
    const [isPinned, setIsPinned] = useState(note?.is_pinned ?? false);
    const [customCategory, setCustomCategory] = useState("");
    const [isCustomCategory, setIsCustomCategory] = useState(false);

    useEffect(() => {
        if (note) {
            setTitle(note.title ?? "");
            setContent(note.content);
            setIsPinned(note.is_pinned ?? false);

            const isDefault = defaultCategories.some(c => c.value === note.category);
            if (!isDefault) {
                setIsCustomCategory(true);
                setCustomCategory(note.category);
                setCategory(""); // Clear standard selection
            } else {
                setCategory(note.category);
            }
        }
    }, [note]);

    const handleSubmit = () => {
        if (!content.trim()) {
            Alert.alert("Required", "Please add some content to your note.");
            return;
        }

        // Use custom category if that mode is active and value exists, else use selected category
        const finalCategory = isCustomCategory ? (customCategory.trim() || "personal") : category;

        onSave({
            title: title.trim() || undefined,
            content: content.trim(),
            category: finalCategory,
            is_pinned: isPinned
        });
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView className="flex-1 p-5">
                {/* Header Actions */}
                <View className="flex-row justify-between items-center mb-6">
                    <StyledText className="text-2xl font-bold text-gray-900">
                        {note ? 'Edit Note' : 'New Note'}
                    </StyledText>
                    <TouchableOpacity
                        onPress={() => setIsPinned(!isPinned)}
                        className={`p-2 rounded-full ${isPinned ? 'bg-indigo-100' : 'bg-gray-100'}`}
                    >
                        <Pin
                            size={20}
                            color={isPinned ? '#4f46e5' : '#9ca3af'}
                            fill={isPinned ? '#4f46e5' : 'none'}
                        />
                    </TouchableOpacity>
                </View>

                {/* Title Input */}
                <View className="mb-6">
                    <StyledText className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Title</StyledText>
                    <Input
                        placeholder="Note Title"
                        value={title}
                        onChangeText={setTitle}
                        className="text-lg font-semibold bg-transparent border-0 border-b border-gray-200 px-0 rounded-none focus:border-indigo-600"
                    />
                </View>

                {/* Category Selection */}
                <View className="mb-6">
                    <StyledText className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Category</StyledText>
                    <View className="flex-row flex-wrap gap-2">
                        {defaultCategories.map((cat) => {
                            const isActive = !isCustomCategory && category === cat.value;
                            return (
                                <TouchableOpacity
                                    key={cat.value}
                                    onPress={() => { setCategory(cat.value); setIsCustomCategory(false); }}
                                    className={`flex-row items-center px-4 py-2 rounded-full border ${isActive ? 'border-transparent' : 'border-gray-200 bg-gray-50'}`}
                                    style={isActive ? { backgroundColor: cat.bg } : {}}
                                >
                                    <cat.icon size={14} color={isActive ? cat.color : '#6b7280'} />
                                    <Text style={{ color: isActive ? cat.color : '#6b7280' }} className="ml-2 font-medium text-sm">{cat.label}</Text>
                                </TouchableOpacity>
                            );
                        })}

                        <TouchableOpacity
                            onPress={() => setIsCustomCategory(true)}
                            className={`flex-row items-center px-4 py-2 rounded-full border ${isCustomCategory ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-gray-50'}`}
                        >
                            <Tag size={14} color={isCustomCategory ? '#4f46e5' : '#6b7280'} />
                            <Text style={{ color: isCustomCategory ? '#4f46e5' : '#6b7280' }} className="ml-2 font-medium text-sm">Custom</Text>
                        </TouchableOpacity>
                    </View>

                    {isCustomCategory && (
                        <View className="mt-3">
                            <Input
                                placeholder="Enter category name..."
                                value={customCategory}
                                onChangeText={setCustomCategory}
                                autoFocus
                                className="bg-gray-50"
                            />
                        </View>
                    )}
                </View>

                {/* Content Input */}
                <View className="flex-1 min-h-[200px]">
                    <StyledText className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Content</StyledText>
                    <StyledTextInput
                        placeholder="Start typing..."
                        value={content}
                        onChangeText={setContent}
                        multiline
                        className="flex-1 bg-gray-50 rounded-xl p-4 text-base text-gray-800 leading-6"
                        textAlignVertical="top"
                        style={{ minHeight: 200 }}
                    />
                </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View className="p-4 border-t border-gray-100 flex-row gap-3 bg-white pb-8">
                <Button variant="outline" onPress={onCancel} className="flex-1 border-gray-300">
                    Cancel
                </Button>
                <Button variant="default" onPress={handleSubmit} className="flex-1 bg-indigo-600 shadow-md shadow-indigo-200" isLoading={isLoading} disabled={isLoading}>
                    Save Note
                </Button>
            </View>
        </View>
    );
}
