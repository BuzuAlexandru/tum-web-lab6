import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../slices/taskSlice';
import editorReducer from "../slices/editorSlice.js";

export const store = configureStore({
    reducer: {
        task: taskReducer,
        editor: editorReducer
    },
});