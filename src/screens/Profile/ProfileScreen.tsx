import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCurrentUser, logoutUser } from '../../utils/storage';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await logoutUser();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          } catch (error) {
            Alert.alert('Error', 'Failed to logout');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <MaterialCommunityIcons name="account-circle" size={80} color="#D97706" />
        </View>

        {user && (
          <>
            <Text style={styles.name}>{user.name || 'User'}</Text>
            <Text style={styles.email}>{user.email || 'user@example.com'}</Text>
          </>
        )}

        <View style={styles.separator} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <MaterialCommunityIcons name="account-edit" size={20} color="#D97706" />
            <Text style={styles.settingText}>Edit Profile</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#A8A29E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <MaterialCommunityIcons name="bell" size={20} color="#D97706" />
            <Text style={styles.settingText}>Notifications</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#A8A29E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <MaterialCommunityIcons name="cloud-upload" size={20} color="#D97706" />
            <Text style={styles.settingText}>Backup</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#A8A29E" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF0',
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D2D2D',
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#78716C',
    textAlign: 'center',
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E7E5E4',
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#A8A29E',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#2D2D2D',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default ProfileScreen;
