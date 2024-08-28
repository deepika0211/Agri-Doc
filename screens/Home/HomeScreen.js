import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Pressable } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.appName}>AppName</Text>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>Hi, UserName</Text>
        <Text style={styles.description}>About App Small Description</Text>
      </View>

      {/* Recent Searches Button */}
      <View style={styles.recentSearches}>
        <Button 
        title="Recent Searches" 
        onPress={() => navigation.navigate('RecentSearchScreen')}
        color='green' />
      </View>

      {/* Categories Section */}
      <ScrollView contentContainerStyle={styles.categories}>
        <View style={styles.categoryRow}>
        <Pressable onPress = {()=> navigation.navigate('PlantDetailScreen')} >
          <View style={styles.category}>
            <Text style={styles.categoryText}>Photo</Text>
            <Text style={styles.categoryText}>PlantName</Text>
          </View>
        </Pressable>
          <View style={styles.category}>
            <Text style={styles.categoryText}>Photo</Text>
            <Text style={styles.categoryText}>PlantName</Text>
          </View>
          <View style={styles.category} />
        </View>
        <View style={styles.categoryRow}>
          <View style={styles.category} />
          <View style={styles.category} />
          <View style={styles.category} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeSection: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  recentSearches: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  categories: {
    flexGrow: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  category: {
    width: '30%',
    height: 100,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
  },
});
