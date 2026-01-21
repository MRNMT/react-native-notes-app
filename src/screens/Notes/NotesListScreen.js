import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getCurrentUser, getNotes } from "../../utils/storage";

export default function NotesListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  const loadNotes = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (user) {
        const userNotes = await getNotes(user.id);
        // Filter and sanitize notes - ensure they have required fields
        const sanitizedNotes = userNotes
          .filter((note) => note && note.notes) // Only keep notes with content
          .map((note) => ({
            ...note,
            category: note.category || "personal", // Add default category
            createdAt: note.createdAt || new Date().toISOString(), // Add default date
          }));
        setNotes(sanitizedNotes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
      Alert.alert("Error", "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    Alert.alert("Delete", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const { deleteNote } = await import("../../utils/storage");
            await deleteNote(noteId);
            loadNotes();
            Alert.alert("Success", "Note deleted");
          } catch (error) {
            Alert.alert("Error", "Failed to delete note");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No notes yet</Text>
          <Text style={styles.emptySubText}>
            Create your first note to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.noteCard}
              onPress={() =>
                navigation.navigate("NoteDetail", { noteId: item.id })
              }
            >
              <View style={styles.noteHeader}>
                <Text style={styles.noteTitle}>{item.title || "Untitled"}</Text>
                <TouchableOpacity
                  onPress={() => handleDeleteNote(item.id)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
              <Text style={styles.noteCategory}>
                {item.category || "Personal"}
              </Text>
              <Text style={styles.noteContent} numberOfLines={2}>
                {item.notes}
              </Text>
              <Text style={styles.noteDate}>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "Unknown date"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddNote")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  noteCard: {
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    flex: 1,
  },
  deleteButton: {
    padding: 8,
  },
  noteCategory: {
    fontSize: 12,
    color: "#007AFF",
    marginBottom: 4,
    fontWeight: "500",
  },
  noteContent: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    color: "#999",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
