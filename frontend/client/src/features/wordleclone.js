import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

function wordToArray(word) {
    // Split the word into an array of characters
    return word.split('');
}

export const getRandomWord = createAsyncThunk(
    'wordleClone/getRandomWord',
    async (_, thunkAPI) => {
    try {
        const res = await fetch('api/wordleClone/words/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        });
        const data = await res.json();
        if (res.status === 200) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch(err) {
        if (err.response) {
            return thunkAPI.rejectWithValue(err.response.data);
        } else {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
});

const initialState = {
    loading: false,
    randomWord: [],
    gameWord: []
};


const wordleCloneSlice = createSlice({
    name: 'wordleClone',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRandomWord.pending, state => {
                state.loading = true;
            })
            .addCase(getRandomWord.fulfilled, (state, action) => {
                state.loading = false;
                state.randomWord = action.payload;
                state.gameWord = action.payload.word.toUpperCase().split('');
            })
            .addCase(getRandomWord.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export default wordleCloneSlice.reducer;