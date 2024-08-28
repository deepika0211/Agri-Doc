import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, firestore, doc, getDoc } from '../../firebase';
import NavigationBar from '../NavigationBar';

const UserProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name || '');
            setEmail(userData.email || '');
            setPhoneNumber(userData.phoneNumber || '');
            setLocation(userData.location || '');
            setProfilePic(userData.profilePic || null);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            auth.signOut().then(() => {
              navigation.replace('LoginScreen');
            }).catch(error => {
              console.error('Error logging out:', error);
            });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="arrow-back" size={24} color="#fff" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={profilePic ? { uri: profilePic } : require('../../assets/CamPageImages/back.jpg')}
          style={styles.profilePic}
        />
        <Text style={styles.nameText}>{name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.infoText}>{email}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.infoText}>{phoneNumber}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.infoText}>{location}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('SettingsScreen')}>
          <Ionicons name="settings-outline" size={24} color="#00796B" />
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#d32f2f" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00796B',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    elevation: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#00796B',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  editButton: {
    backgroundColor: '#00796B',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 80,
    elevation: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 30,
  },
  settingsContainer: {
    marginTop: 20,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsButtonText: {
    fontSize: 18,
    color: '#00796B',
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#d32f2f',
    marginLeft: 10,
  },
});

export default UserProfileScreen;
