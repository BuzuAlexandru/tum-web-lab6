import { createSlice } from '@reduxjs/toolkit'

const initialState = { editing: NaN }

const editorSlice = createSlice({
    name: 'editing',
    initialState,
    reducers: {
        editing(state, action) {
            state.editing =  action.payload
        },
    },
})

export const {
    editing
} = editorSlice.actions

export default editorSlice.reducer