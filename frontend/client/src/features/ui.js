import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    themePicked: 1,
    themePickerToggle: false,
    expandedCategories: [],
};

const userSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        resetTheme: state => {
            state.themePicked = 1
        },
        setTheme: (state, action) => {
            state.themePicked = action.payload
        },
        toggleThemePicker: state => {
            state.themePickerToggle = !state.themePickerToggle
        },
        toggleCategory: (state, action) => {
            const category = action.payload;
            const categoryIndex = state.expandedCategories.findIndex(c => c.name === category.name);
            if (categoryIndex !== -1) {
                state.expandedCategories.splice(categoryIndex, 1);
            } else {
                state.expandedCategories.push(category);
            }
        }
    },
});

export const { resetTheme, setTheme, toggleThemePicker, toggleCategory } = userSlice.actions;
export default userSlice.reducer;