import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const NoteCard = ({note, onPress, onEdit, onDelete, categoryColor}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getPreviewText = () => {
    return note.notes.length > 100
      ? note.notes.substring(0, 100) + '...'
      : note.notes;
  };

  return (
    <TouchableOpacity
      style={[styles.card, {borderLeftColor: categoryColor}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {note.title && <Text style={styles.title}>{note.title}</Text>}
          <Text style={styles.date}>
            {formatDate(note.createdAt)}
            {note.updatedAt !== note.createdAt && (
              <Text style={styles.edited}> (edited)</Text>
            )}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={onEdit}
            style={styles.actionButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <MaterialCommunityIcons name="pencil" size={18} color="#6366f1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            style={styles.actionButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <MaterialCommunityIcons name="delete" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.content}>{getPreviewText()}</Text>
      <View style={[styles.categoryBadge, {backgroundColor: categoryColor + '20'}]}>
        <Text style={[styles.categoryText, {color: categoryColor}]}>
          {note.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
  },
  edited: {
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  content: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default NoteCard;