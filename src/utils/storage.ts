import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users';
const NOTES_KEY = '@notes';
const CURRENT_USER_KEY = '@current_user';

interface UserData {
  id?: string;
  email: string;
  password: string;
  name: string;
  [key: string]: any;
}

interface NoteData {
  id?: string;
  userId?: string;
  title: string;
  notes: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

// User Management
export const registerUser = async (userData: UserData) => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    const existingUser = users.find((u: UserData) => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    const user = users.find((u: UserData) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserData>) => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    const userIndex = users.findIndex((u: UserData) => u.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users[userIndex] = {...users[userIndex], ...updates};
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]));
    
    return users[userIndex];
  } catch (error) {
    throw error;
  }
};

// Notes Management
export const getNotes = async (userId: string) => {
  try {
    const notesJson = await AsyncStorage.getItem(NOTES_KEY);
    const allNotes = notesJson ? JSON.parse(notesJson) : [];
    return allNotes.filter((note: NoteData) => note.userId === userId);
  } catch (error) {
    return [];
  }
};

export const addNote = async (userId: string, noteData: NoteData) => {
  try {
    const notesJson = await AsyncStorage.getItem(NOTES_KEY);
    const notes = notesJson ? JSON.parse(notesJson) : [];
    
    const newNote = {
      id: Date.now().toString(),
      userId,
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    notes.push(newNote);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    return newNote;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (noteId: string, updates: Partial<NoteData>) => {
  try {
    const notesJson = await AsyncStorage.getItem(NOTES_KEY);
    const notes = notesJson ? JSON.parse(notesJson) : [];
    
    const noteIndex = notes.findIndex((n: NoteData) => n.id === noteId);
    if (noteIndex === -1) {
      throw new Error('Note not found');
    }
    
    notes[noteIndex] = {
      ...notes[noteIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    return notes[noteIndex];
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    const notesJson = await AsyncStorage.getItem(NOTES_KEY);
    const notes = notesJson ? JSON.parse(notesJson) : [];
    
    const filteredNotes = notes.filter((n: NoteData) => n.id !== noteId);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filteredNotes));
  } catch (error) {
    throw error;
  }
};