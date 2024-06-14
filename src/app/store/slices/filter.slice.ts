import {createSlice} from "@reduxjs/toolkit";

interface FilterState {
    genres: string[],
    year: [number, number],
    rating: [number, number]
}

const initialState: FilterState = {
    genres: [],
    year: [1900, 2021],
    rating: [0, 10]
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setGenres: (state, action) => {
            state.genres = action.payload
        },
        setYear: (state, action) => {
            state.year = action.payload
        },
        setRating: (state, action) => {
            state.rating = action.payload
        }
    }
})
export const {setGenres, setYear, setRating} = filterSlice.actions
export const {reducer} = filterSlice