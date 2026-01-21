import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {updateNote} from '../../utils/storage';
import {CATEGORIES} from '../../constants/categories';

const EditNoteScreen = ({navigation, route}) => {
  const {note} = route.params;
  const [title, setTitle] = useState(note.title || '');
  const [notes, setNotes] = useState(note.notes);
  const [category, setCategory] = useState(note.category);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!notes.trim()) {
      Alert.alert('Error', 'Please enter note content');
      return;
    }

    setLoading(true);
    try {
      await updateNote(note.id, {
        title: title.trim(),
        notes: notes.trim(),
        category,
      });
      Alert.alert('Success', 'Note updated successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update note');
    } finally {
      setLoading(false);
    }
  };

  const noteCategories = CATEGORIES.filter(cat => cat.id !== 'all');

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
          {noteCategories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                category === cat.id && {backgroundColor: cat.color},
              ]}
              onPress={() => setCategory(cat.id)}>
              <Text
                style={[
                  styles.categoryText,
                  category === cat.id && styles.categoryTextSelected,
                ]}>
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
          onPress={handleUpdate}
          disabled={loading}>
          <Text style={styles.saveButtonText}>
            {loading ? 'Updating...' : 'Update Note'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    marginTop: 16,
  },
  titleInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  notesInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditNoteScreen;