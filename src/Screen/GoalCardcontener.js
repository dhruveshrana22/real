// GoalCardList.js
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import GoalCard from '../Componants/GoalCard';

const GoalCardList = () => {
    const goals = useSelector(state => state.goal.goals);
    console.log("first", goals)
    return (
        <View>
            {goals.map(goal => (
                <GoalCard
                    key={goal.id}
                    id={goal.id}  // Pass the id to the GoalCard component
                    title={goal.title}
                    description={goal.description}
                    reminder={goal.reminderDays}
                    maturityDate={goal.maturityDate}
                />
            ))}
        </View>
    );
};

export default GoalCardList;
