import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setTheme } from 'features/ui';



export const register = createAsyncThunk(
    'users/register',
    async ({ first_name, last_name, email, password, re_password }, thunkAPI) => {
        const body = JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            re_password,
        })

        try {
            const res = await fetch('/api/users/register', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			});

            const data = await res.json();

            if (res.status === 201) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const getUser = createAsyncThunk('users/me', async (_, thunkAPI) => {
    try {
        const res = await fetch('/api/users/me', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })

        const data = await res.json();

        if (res.status === 200) {
            const { dispatch } = thunkAPI;
            dispatch(setTheme(data.theme_picked));

            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch(err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const login = createAsyncThunk(
    'users/login',
    async ({ email, password }, thunkAPI) => {
        const body = JSON.stringify({
            email,
            password
        })

        try {
            const res = await fetch('/api/users/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			});

            const data = await res.json();

            if (res.status === 200) {
                const { dispatch } = thunkAPI;

                dispatch(getUser());

                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'users/verify',
    async (_, thunkAPI) => {
        try {
            const res = await fetch('/api/users/verify', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			});

            const data = await res.json();

            if (res.status === 200) {
                const { dispatch } = thunkAPI;

                dispatch(getUser());

                return data;
            } else {

                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            const { dispatch } = thunkAPI;

            dispatch(refreshAuthToken());

            return thunkAPI.rejectWithValue(err.response.data);
        }
});

export const refreshAuthToken = createAsyncThunk(
    '/api/users/refresh',
    async (_, thunkAPI) => {
        try {
            const res = await fetch('/api/users/refresh', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
            })

            const data = await res.json();
            console.log("data: ",data);

            if (res.status === 200) {
                return data;
            } else {
                console.log("The error ocurred in the else", data);
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            console.log("The error ocurred in the else", err);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const logout =  createAsyncThunk(
    'users/logout',
    async (_, thunkAPI) => {
        try {
            const res = await fetch('/api/users/logout', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            const data = await res.json();

            if (res.status === 200) {
                // good place to use data which is a simple success message
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch(err) {
            return thunkAPI.rejectWithValue(err.response.data);
        };
});


export const setDefaultTheme = createAsyncThunk(
    'users/setDefaultTheme',
    async ({ id, theme_picked}, thunkAPI) => {
        const body = JSON.stringify({
            id,
            theme_picked
        });

        try {
            const res = await fetch('/api/users/setDefaultTheme', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            });

            const data = await res.json();

            if (res.status === 200) {
                const { dispatch } = thunkAPI;

                dispatch(setTheme(data.theme_picked));
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)


const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    refreshLoading: false,
    uiLoading: false,
    registered: false,
    error: null
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetRegistered: state => {
            state.registered = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, state => {
                state.loading = true;
            })
            .addCase(register.fulfilled, state => {
                state.loading = false;
                state.registered = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, state => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, state => {
                state.loading = false;
            })
            .addCase(getUser.pending, state => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(getUser.rejected, state => {
                state.loading = false;
            })
            .addCase(checkAuth.pending, state => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, state => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(checkAuth.rejected, state => {
                state.loading = false;
            })
            .addCase(refreshAuthToken.pending, state => {
                state.refreshLoading = true;
            })
            .addCase(refreshAuthToken.fulfilled, state => {
                state.refreshLoading = false;
            })
            .addCase(refreshAuthToken.rejected, state => {
                state.refreshLoading = false;
            })
            .addCase(logout.pending, state => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, state => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.rejected, state => {
                state.loading = false;
            })
            .addCase(setDefaultTheme.pending, state => {
                state.uiLoading = true;
            })
            .addCase(setDefaultTheme.fulfilled, (state, action) => {
                state.uiLoading = false;
                state.user.theme_picked = action.payload.theme_picked
            })
            .addCase(setDefaultTheme.rejected, (state, action) => {
                state.uiLoading = false;
            });
    },
});

export const getUserData = (state) => state.user.user;

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;