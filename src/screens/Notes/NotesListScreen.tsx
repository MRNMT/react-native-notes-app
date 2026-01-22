import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getNotes } from '../../utils/storage';
import NoteCard from '../../components/NoteCard';
import SearchBar from '../../components/SearchBar';

interface Note {
  id: string;
  title: string;
  notes: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface NotesListScreenProps {
  navigation: any;
}

const NotesListScreen: React.FC<NotesListScreenProps> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    try {
      setLoading(true);
      const loadedNotes = await getNotes('current_user');
      setNotes(loadedNotes);
      setFilteredNotes(loadedNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.notes.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleDelete = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    setFilteredNotes(filteredNotes.filter(note => note.id !== noteId));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D97706" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={handleSearch} />
      
      {filteredNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="note-outline" size={48} color="#A8A29E" />
          <Text style={styles.emptyText}>No notes yet</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddNote')}
          >
            <Text style={styles.addButtonText}>Create your first note</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={() => navigation.navigate('NoteDetail', { note: item })}
              onEdit={() => navigation.navigate('EditNote', { note: item })}
              onDelete={() => handleDelete(item.id)}
              categoryColor="#D97706"
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddNote')}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0',
  },
  listContent: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#A8A29E',
    marginTop: 10,
  },
  addButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#D97706',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D97706',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default NotesListScreen;