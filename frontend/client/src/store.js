import { configureStore } from "@reduxjs/toolkit"
import userReducer from "features/user";
import uiReducer from "features/ui";
import jikanAnimeReducer from "features/jikan_anime";
import todoReducer from "features/todo";
import caidaReducer from "features/caidagame";
import wordleCloneReducer from "features/wordleclone";

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
        jikanAnime: jikanAnimeReducer,
        todo: todoReducer,
        caida: caidaReducer,
        wordleClone: wordleCloneReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

