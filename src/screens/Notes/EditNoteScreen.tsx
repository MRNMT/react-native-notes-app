import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { updateNote } from '../../utils/storage';

interface EditNoteScreenProps {
  navigation: any;
  route: any;
}

const EditNoteScreen: React.FC<EditNoteScreenProps> = ({ navigation, route }) => {
  const { note } = route.params;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.notes);
  const [category, setCategory] = useState(note.category);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSaving(true);
    try {
      await updateNote(note.id, {
        title,
        notes: content,
        category,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Enter note title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#A8A29E"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="Write your note here..."
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#A8A29E"
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, saving && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={saving}
      >
        <MaterialCommunityIcons name="check" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Update Note'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0',
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  contentInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 200,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#D97706',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default EditNoteScreen;