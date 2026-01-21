import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {CATEGORIES} from '../../constants/categories';

const NoteDetailScreen = ({route, navigation}) => {
  const {note} = route.params;

  const getCategoryInfo = () => {
    return CATEGORIES.find(cat => cat.id === note.category) || CATEGORIES[0];
  };

  const formatDate = (dateString) => {
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {note.title && <Text style={styles.title}>{note.title}</Text>}

        <View style={styles.metadata}>
          <View
            style={[
              styles.categoryBadge,
              {backgroundColor: categoryInfo.color + '20'},
            ]}>
            <MaterialCommunityIcons name={categoryInfo.icon} size={16} color={categoryInfo.color} />
            <Text style={[styles.categoryText, {color: categoryInfo.color}]}>
              {categoryInfo.name}
            </Text>
          </View>

          <View style={styles.dateContainer}>
            <MaterialCommunityIcons name="calendar" size={14} color="#6b7280" />
            <Text style={styles.dateText}>
              Created: {formatDate(note.createdAt)}
            </Text>
          </View>

          {note.updatedAt !== note.createdAt && (
            <View style={styles.dateContainer}>
              <MaterialCommunityIcons name="update" size={14} color="#6b7280" />
              <Text style={styles.dateText}>
                Updated: {formatDate(note.updatedAt)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.noteContent}>
          <Text style={styles.noteText}>{note.notes}</Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditNote', {note})}>
          <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
          <Text style={styles.editButtonText}>Edit Note</Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  metadata: {
    marginBottom: 24,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 6,
  },
  noteContent: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  noteText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  editButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default NoteDetailScreen;