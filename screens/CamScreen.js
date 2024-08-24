import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { auth } from '../firebase';
import NavigationBar from './NavigationBar';

const CamScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(null);

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
      setImageUri(result.assets[0].uri); // Ensure that this is the correct way to access the image URI
      setPrediction(null); // Reset prediction when a new image is taken
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
      setImageUri(result.assets[0].uri);
      setPrediction(null);
    }
  };

  const predict = async () => {
    try {
      if (typeof imageUri !== 'string') {
        throw new Error('Invalid image URI');
      }

      const uriParts = imageUri.split('/');
      const imageName = uriParts[uriParts.length - 1];
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
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
          <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
            <Text style={styles.optionText}>📷 START CAMERA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
            <Text style={styles.optionText}>OPEN GALLERY</Text>
          </TouchableOpacity>

          {imageUri && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <TouchableOpacity style={styles.predictButton} onPress={predict}>
                <Text style={styles.predictButtonText}>Predict</Text>
              </TouchableOpacity>
            </View>
          )}

          {prediction && (
            <Text style={styles.predictionText}>Prediction: {prediction}</Text>
          )}
        </View>
      </View>

      {/* Navigation Bar */}
      <NavigationBar />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#006400',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
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
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  predictButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4caf50',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  predictButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  predictionText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
  },
});

export default CamScreen;
