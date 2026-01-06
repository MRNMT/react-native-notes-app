import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { NoteForm } from "@/components/notes/NoteForm";
import { useNotes } from "@/hooks/useNotes";
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type Note = Database["public"]["Tables"]["notes"]["Row"];

export default function NoteModal() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { createNote, updateNote } = useNotes();

    // Parse note from params if editing. 
    // Passing complex objects via params is not recommended in Expo Router/Deep Linking due to size limits and serialization.
    // Better approach: Pass ID and fetch, or use a global state store.
    // For MVP, we'll try to parse if passed, but typically we pass 'id' and 'initialData' logic.
    // However, since we have the data in the previous screen, passing it is convenient for simple apps.
    // We'll trust params.note for now, but handle parsing carefully.

    const [note] = useState<Note | null>(() => {
        if (params.note) {
            try {
                return JSON.parse(params.note as string);
            } catch (e) {
                return null;
            }
        }
        return null;
    });

    const handleSave = async (data: any) => {
        try {
            if (note) {
                await updateNote.mutateAsync({ id: note.id, ...data });
            } else {
                await createNote.mutateAsync(data);
            }
            router.back();
        } catch (e) {
            // Error handled in hook primarily
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#e5e7eb', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{note ? 'Edit Note' : 'New Note'}</Text>
            </View>
            <NoteForm
                note={note}
                onSave={handleSave}
                onCancel={() => router.back()}
                isLoading={createNote.isPending || updateNote.isPending}
            />
        </View>
    );
}
