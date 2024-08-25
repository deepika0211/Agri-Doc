import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import NavigationBar from './NavigationBar';

const CamScreen = () => {
  const [imageUri, setImageUri] = useState(null);
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
      setImageUri(result.assets[0].uri);
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
    }
  };

  const navigateToOutputScreen = () => {
    if (imageUri) {
      navigation.navigate('OutputScreen', { imageUri });
    } else {
      Alert.alert('No Image', 'Please select an image before proceeding.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/CamPageImages/background.jpg')}
      style={styles.background}
    >
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
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
              <TouchableOpacity style={styles.predictButton} onPress={navigateToOutputScreen}>
                <Text style={styles.predictButtonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

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
});

export default CamScreen;
