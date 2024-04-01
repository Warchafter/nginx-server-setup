import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const addNewTask = createAsyncThunk(
    'todo/addTask',
    async ({todo_desc}, thunkAPI) => {
        const body = JSON.stringify({todo_desc})
        console.log("body: ",body);

        try {
            const res = await fetch('/api/todo/addTask', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            })

            const data = await res.json()

            if (res.status === 201) {
                const { dispatch } = thunkAPI;

                dispatch(getToDoList())
                return data
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)


export const getToDoList = createAsyncThunk(
    'todo/getToDoList',
    async (_, thunkAPI) => {

        try {
            const res = await fetch('/api/todo/getToDoList', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json()

            if (res.status === 200) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const getToDoStatusList = createAsyncThunk(
    'todo/getToDoStatusList',
    async (_, thunkAPI) => {

        try {
            const res = await fetch('/api/todo/getToDoStatusList', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json()

            if (res.status === 200) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const updateTaskStatus = createAsyncThunk(
    'todo/updateTaskListStatus',
    async ({updatedTasks}, thunkAPI) => {

        const body = JSON.stringify({updatedTasks})

        try {
            const res = await fetch('/api/todo/updateTaskStatus', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body
            })

            const data = await res.json()

            if (res.status === 201) {
                return data
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    loading: false,
    listLoading: false,
    weeklyAnimeScheduleData: null,
    newTask: null,
    todoList: null,
    toDoStatusList: null
};


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewTask.pending, state => {
                state.loading = true;
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.loading = false;
                state.newFavoriteAnime = action.payload;
            })
            .addCase(addNewTask.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getToDoList.pending, state => {
                state.listLoading = true;
            })
            .addCase(getToDoList.fulfilled, (state, action) => {
                state.listLoading = false;
                state.todoList = action.payload;
            })
            .addCase(getToDoList.rejected, (state, action) => {
                state.listLoading = false;
            })
            .addCase(getToDoStatusList.pending, state => {
                state.listLoading = true;
            })
            .addCase(getToDoStatusList.fulfilled, (state, action) => {
                state.listLoading = false;
                state.toDoStatusList = action.payload;
            })
            .addCase(getToDoStatusList.rejected, (state, action) => {
                state.listLoading = false;
            })
            .addCase(updateTaskStatus.pending, state => {
                state.loading = true;
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateTaskStatus.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export default todoSlice.reducer;