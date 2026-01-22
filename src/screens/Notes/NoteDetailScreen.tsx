import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../../constants/categories';

interface Note {
  title: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

interface NoteDetailScreenProps {
  route: {
    params: {
      note: Note;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
}

const NoteDetailScreen: React.FC<NoteDetailScreenProps> = ({ route, navigation }) => {
  const { note } = route.params;

  const getCategoryInfo = () => {
    return CATEGORIES.find(cat => cat.id === note.category) || CATEGORIES[0];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const categoryInfo = getCategoryInfo();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#78716C" />
          </TouchableOpacity>
          
          <View style={[styles.categoryBadge, { backgroundColor: categoryInfo.color + '15', borderColor: categoryInfo.color }]}>
            <MaterialCommunityIcons name={categoryInfo.icon} size={14} color={categoryInfo.color} />
            <Text style={[styles.categoryText, { color: categoryInfo.color }]}>
              {categoryInfo.name.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Note Paper Card */}
        <View style={styles.paperCard}>
          {note.title && <Text style={styles.title}>{note.title}</Text>}
          
          <View style={styles.divider} />

          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="feather" size={14} color="#A8A29E" />
            <Text style={styles.dateText}>{formatDate(note.createdAt)}</Text>
          </View>

          <View style={styles.bodyContent}>
            <Text style={styles.noteText}>{note.notes}</Text>
          </View>

          {note.updatedAt !== note.createdAt && (
            <Text style={styles.lastEditedText}>
              Last ink added on {formatDate(note.updatedAt)}
            </Text>
          )}
        </View>

        {/* Floating Action Button style for Edit */}
        <TouchableOpacity
          style={styles.editFab}
          onPress={() => navigation.navigate('EditNote', { note })}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="pencil" size={24} color="#fff" />
          <Text style={styles.editButtonText}>Edit Entry</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0', // Warm ivory theme
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: 6,
  },
  paperCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    minHeight: 400,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    // Lifted paper shadow
    shadowColor: '#451a03',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D2D2D',
    fontFamily: Platform.OS === 'ios' ? 'Avenir Next' : 'sans-serif-medium',
    lineHeight: 34,
  },
  divider: {
    height: 2,
    backgroundColor: '#D97706', // Amber highlighter divider
    width: 40,
    marginVertical: 15,
    borderRadius: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  dateText: {
    fontSize: 13,
    color: '#A8A29E',
    fontWeight: '600',
    marginLeft: 8,
  },
  bodyContent: {
    marginBottom: 30,
  },
  noteText: {
    fontSize: 18,
    color: '#44403C',
    lineHeight: 28,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  lastEditedText: {
    fontSize: 12,
    color: '#A8A29E',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 'auto',
    paddingTop: 20,
  },
  editFab: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 15,
    marginTop: 30,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 10,
  },
});

export default NoteDetailScreen;