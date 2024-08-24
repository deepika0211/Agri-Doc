import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationBar from './NavigationBar';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hi ...</Text>
            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default HomeScreen;
