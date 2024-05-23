import { createSlice } from '@reduxjs/toolkit'
const sampleData = [
    {
        id: 0,
        title: 'PW Lab 6',
        favourite: false,
        tasks: [
            {
                id: 0,
                description: 'Dark mode',
                completed: true,
            },
            {
                id: 1,
                description: 'Entities that can be manipulated',
                completed: true,
            },
            {
                id: 2,
                description: 'Store state in localStorage',
                completed: true,
            }
        ]
    },
    {
        id: 1,
        title: 'PW Lab 7',
        favourite: false,
        tasks: [
            {
                id: 3,
                description: 'Implement CRUD operations with JWT token',
                completed: false,
            },
            {
                id: 4,
                description: 'Swagger documentation',
                completed: false,
            },
            {
                id: 5,
                description: 'Implement queries to handle large data',
                completed: false,
            }
        ]
    },
]
const storageKey = 'taskData'
const getInitialTaskData = () => {
    const localTaskData = localStorage.getItem(storageKey);
    if (localTaskData) {
        return JSON.parse(localTaskData);
    }
    localStorage.setItem(storageKey, JSON.stringify(sampleData));
    return sampleData;
};
const initialState = getInitialTaskData()

const taskSlice = createSlice({
    name: 'taskData',
    initialState,
    reducers: {
        addTaskData(state, action) {
            state.push(action.payload)
            localStorage.setItem(storageKey, JSON.stringify(state))
        },
        removeTaskCard(state, action) {
            let cardIndex = 0;
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload) {
                    cardIndex = i
                    break
                }
            }
            state.splice(cardIndex,1)
            localStorage.setItem(storageKey, JSON.stringify(state))
        },
        updateTaskData(state, action) {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) {
                    state.splice(i,1, action.payload)
                    break
                }
            }
            localStorage.setItem(storageKey, JSON.stringify(state))
        }
    },
})

export const {
    addTaskData,
    removeTaskCard,
    updateTaskData
} = taskSlice.actions

export default taskSlice.reducer