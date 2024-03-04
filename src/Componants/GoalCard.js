// GoalCard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { deleteGoal, editGoal } from '../redux/AddGoal/goalActionTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
const GoalCard = ({ id, title, description, reminder, maturityDate, onDelete, onEdit }) => {
    const dispatch = useDispatch();
    const [completed, setCompleted] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedReminder, setEditedReminder] = useState(reminder);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [editedMaturityDate, setEditedMaturityDate] = useState(new Date(maturityDate));

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || maturityDate;
        setShowDatePicker(false);
        setEditedMaturityDate(currentDate);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };



    const handleSave = (completed) => {
        const editedGoalData = {
            id,
            title: editedTitle,
            description: editedDescription,
            reminder: editedReminder,
            maturityDate: editedMaturityDate,
            completed: completed,
        };

        // Dispatch the editGoal action
        dispatch(editGoal(editedGoalData));
        closeModal();
    };

    const handleDelete = () => {
        dispatch(deleteGoal(id));
    };
    const currentDate = new Date();

    // Check if the maturity date is in the future
    const isMaturityDateInFuture = editedMaturityDate > currentDate;
    return (

        <View style={styles.card}>
            <View>
                {completed && <Text style={styles.completedText}>Completed</Text>}
                <Text style={styles.title}>{editedTitle}</Text>
                <Text style={styles.description}>{editedDescription}</Text>
                <Text style={styles.info}>Reminder: {editedReminder}</Text>
                <Text style={styles.info}>Maturity Date: {editedMaturityDate.toLocaleDateString('en-US')}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    {(isMaturityDateInFuture || editedMaturityDate.toDateString() === currentDate.toDateString()) && (
                        <TouchableOpacity onPress={openModal} style={styles.editButton}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                    )}
                </View>



            </View>

            {/* Edit Modal */}
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={editedTitle}
                        onChangeText={setEditedTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={editedDescription}
                        onChangeText={setEditedDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Reminder"
                        value={editedReminder}
                        onChangeText={setEditedReminder}
                    />
                    {/* Custom CheckBox */}
                    <TouchableOpacity onPress={() => setCompleted(!completed)}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                            <Icon
                                name={completed ? 'check-square' : 'square-o'}
                                size={24}
                                color={completed ? '#2ecc71' : '#3498db'}
                            /><Text>Completed</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.datePickerButton}
                    >
                        <Text style={styles.buttonText}>
                            {editedMaturityDate.toLocaleDateString('en-US')}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={editedMaturityDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}

                    <View style={styles.modalButtonContainer}>
                        <Button title="Cancel" onPress={closeModal} />
                        <Button title="Save" onPress={() => handleSave(completed)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    completedText: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    datePickerButton: {
        backgroundColor: '#3498db',
        padding: 8,
        borderRadius: 4,
        marginTop: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    info: {
        fontSize: 14,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    editButton: {
        backgroundColor: '#3498db',
        padding: 8,
        borderRadius: 4,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        padding: 8,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    // Styles for Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    modalButtonContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
});

export default GoalCard;
