import Dashboard from "@/components/Dashboard";
import { useLocalSearchParams } from "expo-router";
import type { Database } from "@/integrations/supabase/types";

type NoteCategory = Database["public"]["Enums"]["note_category"];

export default function Page() {
    const { category } = useLocalSearchParams<{ category: string }>();
    // Validate category if needed or trust nav
    return <Dashboard category={category as NoteCategory} />;
}
