import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';

const CamScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch(error => alert(error.message));
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant camera permissions to use this feature.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      predict(result.uri);
    }
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant gallery permissions to use this feature.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      predict(result.uri);
    }
  };

  const predict = async (uri) => {
    try {
      if (typeof uri !== 'string') {
        throw new Error('Invalid image URI');
      }

      const uriParts = uri.split('/');
      const imageName = uriParts[uriParts.length - 1];
      const response = await fetch(uri);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'image/jpeg',
        name: imageName,
      });

      const apiResponse = await axios.post('https://your-cloud-api-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(apiResponse.data);
    } catch (error) {
      console.error('Error predicting:', error);
      Alert.alert('Error', 'An error occurred while predicting.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/CamPageImages/background.jpg')}
      style={styles.background}
    >
      {/* Sign-Out Button at Top Right */}
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        <Text style={styles.signOutButtonText}>Sign out</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={[styles.optionButton, styles.takePhotoButton]} onPress={openCamera}>
            <Text style={styles.optionText}>📷 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
            <Text style={styles.optionText}>Choose From Gallery</Text>
          </TouchableOpacity>

          {imageUri && (
            <Text style={styles.imageText}>Image: {imageUri}</Text>
          )}
          {prediction && (
            <Text style={styles.predictionText}>Prediction: {prediction}</Text>
          )}
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Your crops</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('CamScreen')}>
          <Text style={styles.navText}>Cam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Dukaan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>You</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  screen: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  optionButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
  },
  signOutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#ff5c5c',
    borderRadius: 5,
  },
  signOutButtonText: {
    fontSize: 16,
    color: 'white',
  },
  imageText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  predictionText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 16,
    color: '#000',
  },
});

export default CamScreen;
