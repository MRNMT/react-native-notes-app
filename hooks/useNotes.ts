import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Alert } from "react-native";
import type { Database } from "@/integrations/supabase/types";

type Note = Database["public"]["Tables"]["notes"]["Row"];
type NoteInsert = Database["public"]["Tables"]["notes"]["Insert"];
type NoteUpdate = Database["public"]["Tables"]["notes"]["Update"];
type NoteCategory = Database["public"]["Enums"]["note_category"];

export function useNotes(category?: NoteCategory) {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const notesQuery = useQuery({
        queryKey: ["notes", category],
        queryFn: async () => {
            let query = supabase
                .from("notes")
                .select("*")
                .order("updated_at", { ascending: false });

            if (category) {
                query = query.eq("category", category);
            }

            const { data, error } = await query;

            if (error) throw error;
            return data as Note[];
        },
        enabled: !!user,
    });

    const createNote = useMutation({
        mutationFn: async (note: Omit<NoteInsert, "user_id">) => {
            if (!user) throw new Error("Not authenticated");

            const { data, error } = await supabase
                .from("notes")
                .insert({ ...note, user_id: user.id })
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            // Optional: Alert.alert("Note created", "Your note has been saved.");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    const updateNote = useMutation({
        mutationFn: async ({ id, ...updates }: NoteUpdate & { id: string }) => {
            const { data, error } = await supabase
                .from("notes")
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            // Alert.alert("Note updated", "Your changes have been saved.");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    const deleteNote = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("notes")
                .delete()
                .eq("id", id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            // Alert.alert("Note deleted", "Your note has been removed.");
        },
        onError: (error) => {
            Alert.alert("Error", error.message);
        },
    });

    return {
        notes: notesQuery.data ?? [],
        isLoading: notesQuery.isLoading,
        error: notesQuery.error,
        createNote,
        updateNote,
        deleteNote,
    };
}

export function useSearchNotes(searchQuery: string) {
    const { user } = useAuth();

    return useQuery({
        queryKey: ["notes", "search", searchQuery],
        queryFn: async () => {
            if (!searchQuery.trim()) return [];

            const { data, error } = await supabase
                .from("notes")
                .select("*")
                .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
                .order("updated_at", { ascending: false });

            if (error) throw error;
            return data as Note[];
        },
        enabled: !!user && searchQuery.length > 0,
    });
}
