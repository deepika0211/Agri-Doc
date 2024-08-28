import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('CamScreen')}>
        <Text style={styles.navText}>Cam</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ChatScreen')}>
        <Text style={styles.navText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('UserProfileScreen')}>
        <Text style={styles.navText}>You</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default NavigationBar;
