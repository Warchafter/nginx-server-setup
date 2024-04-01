import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const getWeeklyAnimeScheduleRelease = createAsyncThunk(
    'jikanAnime',
    async ({scheduleDay}, thunkAPI) => {
    try {
        const res = await fetch(`/api/jikanAnime/weekly?scheduleDay=${scheduleDay}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        const data = await res.json();

        if (res.status === 200) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const addFavoriteAnime = createAsyncThunk(
    'jikanAnime/addFav',
    async ({mal_id}, thunkAPI) => {
        const body = JSON.stringify({mal_id})

        try {
            const res = await fetch('/api/jikanAnime/addFav', {
                method: 'POST',
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

export const getFavoriteAnimeList = createAsyncThunk(
    'jikanAnime/getFavList',
    async (_, thunkAPI) => {

        try {
            const res = await fetch('/api/jikanAnime/getFavList', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
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

const initialState = {
    loading: false,
    weeklyAnimeScheduleData: null,
    newFavoriteAnime: null,
    favoriteAnimeList: {
        "links": {
            "next": null,
            "previous": null
        },
        "count": 0,
        "results": []
    }
};


const jikanAnimeSlice = createSlice({
    name: 'jikanAnime',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeeklyAnimeScheduleRelease.pending, state => {
                state.loading = true;
            })
            .addCase(getWeeklyAnimeScheduleRelease.fulfilled, (state, action) => {
                state.loading = false;
                state.weeklyAnimeScheduleData = action.payload;
            })
            .addCase(getWeeklyAnimeScheduleRelease.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(addFavoriteAnime.pending, state => {
                state.loading = true;
            })
            .addCase(addFavoriteAnime.fulfilled, (state, action) => {
                state.loading = false;
                state.newFavoriteAnime = action.payload;
            })
            .addCase(addFavoriteAnime.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getFavoriteAnimeList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFavoriteAnimeList.fulfilled, (state, action) => {
                state.loading = false;
                state.favoriteAnimeList = action.payload;
            })
            .addCase(getFavoriteAnimeList.rejected, (state, action) => {
                state.loading = false;
                console.log("action log: ", action);
            })
    },
});

export default jikanAnimeSlice.reducer;