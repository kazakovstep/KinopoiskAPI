import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const BASE_URL = "https://api.kinopoisk.dev/v1.4/movie";
export const KEY = "88EE475-4EXM2A7-KBG4TT6-QKM4VQF";

export interface ICatalog {
    docs: {
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
    }[];
    page: number;
    pages: number;
}

export interface IFilmContent {
    id: number;
    poster: {
        previewUrl: string;
    };
    name: string;
    description: string;
    rating: {
        kp: number;
        imdb: number;
        filmCritics: number;
        russianFilmCritics: number;
        await: number;
    };
    year: number;
    genres: {
        name: string;
    }[];
}

export const MoviesApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Movies'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('X-API-KEY', KEY);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCatalog: builder.query<ICatalog, {
            page: number,
            genres: string[],
            year: [number, number],
            rating: [number, number]
        }>({
            query: ({page, genres, year, rating}) => {
                const params = new URLSearchParams({
                    limit: '50',
                    page: page.toString(),
                    year: `${year[0]}-${year[1]}`,
                    'rating.kp': `${rating[0]}-${rating[1]}`
                });

                genres.forEach((genre) => {
                    params.append('genres.name', genre);
                });

                return {
                    url: '',
                    params: params,
                };
            },
            providesTags: () => [{
                type: 'Movies'
            }],
        }),
        getMovieById: builder.query<IFilmContent, { id: number }>({
            query: ({id}) => ({
                url: `/${id}`,
            }),
            providesTags: () => [{
                type: 'Movies'
            }],
        }),
    }),
});

export const {useGetCatalogQuery, useGetMovieByIdQuery} = MoviesApi;
