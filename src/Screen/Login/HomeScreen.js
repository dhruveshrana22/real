// Import necessary components from React Native
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import GoalCardcontener from '../GoalCardcontener';

// HomeScreen component
const HomeScreen = ({ navigation }) => {
  const [goalData, setGoalData] = useState({
    totalGoals: 0,
    completedGoals: 0,
    ongoingGoals: 0,
  });
  // const fetchDummyData = async () => {
  //   try {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos');

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const goals = await response.json();

  //     // Calculate total, completed, and ongoing goals based on the dummy data
  //     const totalGoals = goals.length;
  //     const completedGoals = goals.filter(goal => goal.completed).length;
  //     const ongoingGoals = totalGoals - completedGoals;

  //     // Update the state with the calculated values
  //     setGoalData({ totalGoals, completedGoals, ongoingGoals });
  //   } catch (error) {
  //     console.error('Error fetching dummy data:', error.message);
  //   }
  // };

  // // Fetch dummy data when the component mounts
  // useEffect(() => {
  //   fetchDummyData();
  // }, []);


  return (
    <View style={styles.container}>

      <ScrollView>

        <GoalCardcontener />
      </ScrollView>



      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GoalSetting')}
      >
        <Text style={styles.buttonText}>Set New Goal</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  dashboard: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  dashboardText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// Export the HomeScreen component
export default HomeScreen;
