import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    Typography
} from "@mui/material";
import { RootState } from "../../app/store/store.ts";
import { setGenres, setYear, setRating } from "../../app/store/slices/filter.slice.ts";
import {Link} from "react-router-dom";

const genresList = [
    { id: 1, name: 'драма' },
    { id: 2, name: 'комедия' },
    { id: 3, name: 'мелодрама' },
    { id: 4, name: 'короткометражка' },
    { id: 5, name: 'музыка' },
    { id: 6, name: 'мультфильм' },
    { id: 7, name: 'боевик' },
    { id: 8, name: 'аниме' },
    { id: 9, name: 'приключения' },
    { id: 10, name: 'фэнтези' },
];

export const Filter = () => {
    const dispatch = useDispatch();
    const selectedGenres = useSelector((state: RootState) => state.filter.genres);
    const ratingRange = useSelector((state: RootState) => state.filter.rating);
    const yearRange = useSelector((state: RootState) => state.filter.year);
    const favouritesCount = useSelector((state: RootState) => state.favourites.amount);

    const handleGenreChange = (event: SelectChangeEvent<string[]>) => {
        dispatch(setGenres(event.target.value as string[]));
    };

    const handleRatingChange = (_event: Event, newValue: number | number[]) => {
        dispatch(setRating(newValue as [number, number]));
    };

    const handleYearChange = (_event: Event, newValue: number | number[]) => {
        dispatch(setYear(newValue as [number, number]));
    };

    return (
        <Box p={2} width={300} position={"sticky"} top={0} height={200}>
            <Typography variant="h6" sx={{color: "white"}}>Фильтры</Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel sx={{color: "white"}}>Жанры</InputLabel>
                <Select
                    multiple
                    value={selectedGenres}
                    onChange={handleGenreChange}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    sx={{color: "white"}}
                >
                    {genresList.map((genre) => (
                        <MenuItem key={genre.id} value={genre.name}>
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box mt={4}>
                <Typography gutterBottom sx={{color: "white"}}>Рейтинг</Typography>
                <Slider
                    value={ratingRange}
                    onChange={handleRatingChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10}
                    sx={{color: "white"}}
                />
            </Box>
            <Box mt={4}>
                <Typography gutterBottom sx={{color: "white"}}>Год выпуска</Typography>
                <Slider
                    value={yearRange}
                    onChange={handleYearChange}
                    valueLabelDisplay="auto"
                    min={1990}
                    max={new Date().getFullYear()}
                    sx={{color: "white"}}
                />
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
                <Typography variant="body1" sx={{color: "white"}}>
                    Избранное
                </Typography>
                <Typography variant="body1" sx={{color: "white"}}>
                    {favouritesCount}
                </Typography>
            </Box>
            <Link to={"/favourites"}>
                <Typography variant="body1" sx={{color: "white"}}>
                    Перейти в избранное
                </Typography>
            </Link>
        </Box>
    );
};