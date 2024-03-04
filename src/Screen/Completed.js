// Import necessary components from React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// App component
const CompletedScreen = () => {
    // Use the useSelector hook to get goals from the Redux store
    const goals = useSelector(state => state.goal.goals);

    // Filter goals with completed status
    const completedGoals = goals.filter((goal) => goal.completed);

    return (
        <View style={styles.container}>
            {completedGoals.map((goal) => (
                <View key={goal.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{goal.title}</Text>
                    <Text>{goal.description}</Text>
                    <Text>{new Date(goal.maturityDate).toLocaleDateString('en-US')}</Text>
                </View>
            ))}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

// Export the CompletedScreen component
export default CompletedScreen;
