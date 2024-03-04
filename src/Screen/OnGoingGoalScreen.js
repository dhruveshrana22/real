// OngoingGoalsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import GoalCard from '../Componants/GoalCard';

const OngoingGoalsScreen = () => {
    const ongoingGoals = useSelector(state => state.goal.goals);

    return (
        <View style={styles.container}>
            {ongoingGoals.length === 0 ? (
                <Text>No ongoing goals at the moment</Text>
            ) : (
                <FlatList
                    data={ongoingGoals}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <GoalCard
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            maturityDate={item.maturityDate}
                        // Add other props as needed
                        />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default OngoingGoalsScreen;
