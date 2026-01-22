import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NoteCardProps {
  note: {
    title: string;
    notes: string;
    category: string;
    createdAt: string;
    updatedAt: string;
  };
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
  categoryColor: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onPress, onEdit, onDelete, categoryColor }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getPreviewText = () => {
    return note.notes.length > 85
      ? note.notes.substring(0, 85).replace(/\n/g, ' ') + '...'
      : note.notes;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Visual "Pin" or Tape effect at the top */}
      <View style={[styles.tape, { backgroundColor: categoryColor + '40' }]} />

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {note.title && (
            <Text style={styles.title} numberOfLines={1}>
              {note.title}
            </Text>
          )}
          {/* Highlighter underline for the title */}
          <View style={[styles.highlighter, { backgroundColor: categoryColor }]} />
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
            <MaterialCommunityIcons name="pencil-outline" size={16} color="#78716C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
            <MaterialCommunityIcons name="trash-can-outline" size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.content}>{getPreviewText()}</Text>

      <View style={styles.footer}>
        <View style={[styles.categoryPill, { borderColor: categoryColor }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {note.category}
          </Text>
        </View>
        <Text style={styles.date}>
          {formatDate(note.createdAt)}
          {note.updatedAt !== note.createdAt && <Text style={styles.edited}> • edited</Text>}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#451a03',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E7E5E4',
  },
  tape: {
    position: 'absolute',
    top: -6,
    alignSelf: 'center',
    width: 60,
    height: 12,
    borderRadius: 2,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D2D2D',
    zIndex: 2,
  },
  highlighter: {
    height: 6,
    width: '60%',
    marginTop: -8,
    opacity: 0.3,
    borderRadius: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
  },
  iconButton: {
    padding: 6,
    backgroundColor: '#F5F5F4',
    borderRadius: 8,
  },
  content: {
    fontSize: 14,
    color: '#57534E',
    lineHeight: 20,
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F4',
    paddingTop: 10,
  },
  categoryPill: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 11,
    color: '#A8A29E',
    fontWeight: '600',
  },
  edited: {
    fontStyle: 'italic',
    fontSize: 10,
  },
});

export default NoteCard;