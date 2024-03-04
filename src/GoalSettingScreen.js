// Import necessary components from React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// App component
const GoalSettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, World!</Text>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

// Export the App component
export default GoalSettingScreen;
