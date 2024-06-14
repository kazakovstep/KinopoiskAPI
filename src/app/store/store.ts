import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {MoviesApi} from "./api/movies.api.ts"
import {reducer as FilterReducer} from "./slices/filter.slice.ts";
import {reducer as FavouritesReducer} from "./slices/favourites.slice.ts";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [MoviesApi.reducerPath]
}

const reducers = combineReducers({
    [MoviesApi.reducerPath]: MoviesApi.reducer,
    filter: FilterReducer,
    favourites: FavouritesReducer
})

const persistRedusers = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistRedusers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(MoviesApi.middleware)
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>