import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { CATEGORIES } from "../../constants/categories";
import { addNote, getCurrentUser } from "../../utils/storage";

const AddNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("personal");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!notes.trim()) {
      Alert.alert("Error", "Please enter note content");
      return;
    }

    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        Alert.alert("Error", "User not found. Please login again.");
        return;
      }
      await addNote(user.id, {
        title: title.trim() || "Untitled Note",
        notes: notes.trim(),
        category,
      });
      Alert.alert("Success", "Note added successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", error.message || "Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  const noteCategories = CATEGORIES.filter((cat) => cat.id !== "all");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title (Optional)</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Enter note title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#9ca3af"
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {noteCategories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                category === cat.id && { backgroundColor: cat.color },
              ]}
              onPress={() => setCategory(cat.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat.id && styles.categoryTextSelected,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Enter your note here..."
          value={notes}
          onChangeText={setNotes}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#9ca3af"
        />

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? "Saving..." : "Save Note"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
    marginTop: 16,
  },
  titleInput: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1f2937",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  categoryText: {
    fontSize: 14,
    color: "#4b5563",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  notesInput: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1f2937",
    minHeight: 200,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  saveButton: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddNoteScreen;
