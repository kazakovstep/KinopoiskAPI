import {createSlice} from "@reduxjs/toolkit";

interface IFavourite {
    id: number;
    name: string;
    rating: {
        kp: number;
        imdb: number;
        filmCritics: number;
        russianFilmCritics: number;
        await: number;
    };
    year: number;
    poster: {
        previewUrl: string;
    };
}

interface FavouritesState {
    favourites: IFavourite[],
    amount: number
}

const initialState: FavouritesState = {
    favourites: [],
    amount: 0
}

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        toggleFavourite: (state: FavouritesState, {payload: movie}) => {
            const isExist = state.favourites.some(r => r.id === movie.id)
            if (isExist) {
                const index = state.favourites.findIndex(item => item.id === movie.id)
                if (index !== -1) {
                    state.favourites.splice(index, 1)
                    state.amount -= 1
                }
            } else {
                state.favourites.push(movie)
                state.amount += 1
            }
        }
    },
})
export const {toggleFavourite} = favouritesSlice.actions
export const {reducer} = favouritesSlice