import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { addGoal } from '../redux/AddGoal/goalActionTypes';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';


const AddGoalScreen = ({ navigation, addGoal }) => {
    const [goalTitle, setGoalTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reminderDays, setReminderDays] = useState([]);
    const [maturityDate, setMaturityDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [editedMaturityDate, setEditedMaturityDate] = useState(new Date());

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || maturityDate
        setShowDatePicker(false);
        setMaturityDate(currentDate);
    };


    const handleReminderClick = (day) => {
        // Toggle selected/unselected state for reminder days
        setReminderDays(prevDays => {
            if (prevDays.includes(day)) {
                return prevDays.filter(d => d !== day);
            } else {
                return [...prevDays, day];
            }
        });
    };
    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const clearFields = () => {
        setGoalTitle('');
        setDescription('');
        setReminderDays([]);
        setMaturityDate(new Date());
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>New Goal</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="close" size={20} />
                </TouchableOpacity>
            </View>

            <Text style={styles.placeholderTitle}>Goal Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your goal title"
                value={goalTitle}
                onChangeText={text => setGoalTitle(text)}
            />

            <Text style={styles.placeholderTitle}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your goal description"
                value={description}
                onChangeText={text => setDescription(text)}
            />

            <Text style={styles.subHeaderText}>Reminder</Text>
            <View style={styles.reminderButtonsContainer}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.reminderButton,
                            { backgroundColor: reminderDays.includes(day) ? 'blue' : 'white' },
                        ]}
                        onPress={() => handleReminderClick(day)}
                    >
                        <Text
                            style={[
                                styles.dayText,
                                { color: reminderDays.includes(day) ? 'white' : 'black' },
                            ]}
                        >
                            {day[0]}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
            >
                <Text style={styles.buttonText}>
                    {maturityDate.toLocaleDateString('en-US')}
                </Text>

            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={maturityDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    const goalData = {
                        id: generateUniqueId(),
                        title: goalTitle,
                        description,
                        reminderDays,
                        maturityDate: maturityDate.toISOString(),
                    };
                    addGoal(goalData);
                    clearFields(); // Clear input fields
                    // Additional logic if needed
                    navigation.goBack();
                }}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    datePickerButton: {
        backgroundColor: '#3498db',
        padding: 8,
        borderRadius: 4,
        marginTop: 16,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
    },
    placeholderTitle: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    reminderButtonsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    reminderButton: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'blue',
    },
    dayText: {
        color: 'black',
    },
});

export default connect(null, { addGoal })(AddGoalScreen);
