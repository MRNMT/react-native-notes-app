import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNotes } from "@/hooks/useNotes";
import { NoteCard } from "@/components/notes/NoteCard";
import { SearchBar } from "@/components/notes/SearchBar";
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import { Plus, ArrowDownUp } from "lucide-react-native";
import { styled } from "nativewind";
import type { Database } from "@/integrations/supabase/types";

type NoteCategory = string;

export default function Dashboard({ category }: { category?: NoteCategory }) {
    const { notes, isLoading, deleteNote } = useNotes(category);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc'); // Default to newest first
    const router = useRouter();

    const filteredNotes = useMemo(() => {
        let result = notes || [];

        // Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (note) =>
                    note.title?.toLowerCase().includes(query) ||
                    note.content.toLowerCase().includes(query)
            );
        }

        // Sort
        return result.sort((a, b) => {
            // Pinned notes always stick to top regardless of sort order
            if (a.is_pinned && !b.is_pinned) return -1;
            if (!a.is_pinned && b.is_pinned) return 1;

            // Sort by Date Added (created_at) as per requirements
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();

            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

    }, [notes, searchQuery, sortOrder]);

    const toggleSort = () => {
        setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    const handleEdit = (note: any) => {
        router.push({
            pathname: "/note-modal",
            params: { note: JSON.stringify(note) }
        });
    };

    const handleDelete = (id: string) => {
        deleteNote.mutate(id);
    };

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    const insets = useSafeAreaInsets();
    const containerStyle = Platform.OS === 'web' ? { maxWidth: 600, width: '100%', alignSelf: 'center' as const } : { flex: 1 };

    return (
        <View className="flex-1 bg-gray-50">
            <View style={containerStyle} className="flex-1 relative">
                <View className="px-4 py-4 bg-white border-b border-gray-200 z-10 shadow-sm flex-row gap-2">
                    <View className="flex-1">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </View>
                    <TouchableOpacity
                        onPress={toggleSort}
                        className="h-10 w-10 bg-gray-100 rounded-lg items-center justify-center border border-gray-200"
                    >
                        <ArrowDownUp size={20} color={sortOrder === 'desc' ? "#4f46e5" : "#6b7280"} />
                    </TouchableOpacity>
                </View>

                {/* Sort Indicator */}
                <View className="px-4 py-2 bg-gray-50 flex-row justify-end">
                    <Text className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                        Sorted by Date Added: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                    </Text>
                </View>

                <FlatList
                    data={filteredNotes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NoteCard
                            note={item}
                            onClick={() => handleEdit(item)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    )}
                    contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center pt-20 px-10">
                            <Text className="text-gray-300 text-6xl mb-4">✨</Text>
                            <Text className="text-gray-500 text-lg font-semibold mb-1">No notes found</Text>
                            <Text className="text-gray-400 text-center text-sm">Create a new note or adjust your search.</Text>
                        </View>
                    }
                />
            </View>

            <View
                style={{
                    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
                    // On web the browser UI can overlay the bottom area; lift the FAB higher for web
                    bottom: Platform.OS === 'web' ? 96 : Math.max(24, insets.bottom + 24),
                    right: 24,
                    zIndex: 9999,
                }}
                pointerEvents="box-none"
            >
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Create new note"
                    className="bg-indigo-600 rounded-full items-center justify-center shadow-xl shadow-indigo-300 border border-white/20"
                    onPress={() => router.push("/note-modal")}
                    activeOpacity={0.9}
                    style={{
                        width: 64,
                        height: 64,
                        elevation: 10,
                        // @ts-ignore
                        cursor: 'pointer',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Plus color="white" size={28} strokeWidth={2.5} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
