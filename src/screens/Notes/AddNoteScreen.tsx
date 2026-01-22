import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addNote } from '../../utils/storage';

interface AddNoteScreenProps {
  navigation: any;
}

const AddNoteScreen: React.FC<AddNoteScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('personal');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSaving(true);
    try {
      await addNote('current_user', {
        title,
        notes: content,
        category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save note');
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
        <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save Note'}</Text>
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

export default AddNoteScreen;