// goalActions.js

// Action Types
export const ADD_GOAL = 'ADD_GOAL';
export const EDIT_GOAL = 'EDIT_GOAL';
export const DELETE_GOAL = 'DELETE_GOAL';
export const TOGGLE_COMPLETED = 'TOGGLE_COMPLETED';

// Action Creators
export const addGoal = (goalData) => ({
    type: ADD_GOAL,
    payload: goalData,
});

export const editGoal = (goalData) => ({
    type: EDIT_GOAL,
    payload: goalData,
});

export const deleteGoal = (goalId) => ({
    type: DELETE_GOAL,
    payload: goalId,
});


export const toggleCompleted = (goalId) => ({
    type: TOGGLE_COMPLETED,
    payload: goalId,
});

// Reducer
const initialState = {
    goals: [],
};

export const goalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GOAL:
            return {
                ...state,
                goals: [...state.goals, action.payload],
            };
        case EDIT_GOAL:
            return {
                ...state,
                goals: state.goals.map((goal) =>
                    goal.id === action.payload.id ? action.payload : goal
                ),
            };
        case DELETE_GOAL:
            return {
                ...state,
                goals: state.goals.filter((goal) => goal.id !== action.payload),
            };
        case TOGGLE_COMPLETED:
            return {
                ...state,
                goals: state.goals.map((goal) =>
                    goal.id === action.payload ? { ...goal, completed: !goal.completed } : goal
                ),
            };
        default:
            return state;
    }
};
