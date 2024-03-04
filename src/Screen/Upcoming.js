import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import GoalCard from '../Componants/GoalCard';
import OngoingGoalsScreen from './OnGoingGoalScreen';
import { deleteGoal } from '../redux/AddGoal/goalActionTypes';

const Upcoming = () => {
    // Use the useSelector hook to get goals from the Redux store
    const goals = useSelector(state => state.goal.goals);

    // Filter goals with maturity date after the current date and not completed
    const upcomingGoals = goals.filter((goal) => {
        const isFutureDate = new Date(goal.maturityDate) > new Date();
        const isNotCompleted = !goal.completed;
        return isFutureDate && isNotCompleted;
    });

    // Function to check if the current date matches any goal's maturity date
    const isCurrentDateInGoals = () => {
        const currentDate = new Date();
        return goals.some((goal) => !goal.completed && new Date(goal.maturityDate).toDateString() === currentDate.toDateString());
    };

    const handleDelete = () => {
        dispatch(deleteGoal(id));
    };
    return (
        <View style={styles.container}>
            {/* Render the current date card if there's a goal with the current date */}
            {isCurrentDateInGoals() && (
                <GoalCard
                    key="currentDateCard"
                    title="Current Date Goal"
                    description="This goal is set for today."
                    maturityDate={new Date()}
                    onDelete={handleDelete}
                    onEdit={() => handleEdit(currentDateCardId)}
                />
            )}

            {/* Render upcoming goals */}
            {upcomingGoals.map((goal) => (
                <GoalCard
                    key={goal.id}
                    id={goal.id}
                    title={goal.title}
                    description={goal.description}
                    reminder={goal.reminder}
                    maturityDate={goal.maturityDate}
                    onDelete={() => handleDelete(goal.id)}
                    onEdit={() => handleEdit(goal.id)}
                />
            ))}
            {/* <OngoingGoalsScreen /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default Upcoming;
