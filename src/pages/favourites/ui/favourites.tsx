import {useSelector} from "react-redux";
import {Box, Grid, Typography} from "@mui/material";
import {RootState} from "../../../app/store/store.ts";
import {FilmCard} from "../../../shared/ui/FilmCard/FilmCard";

export const Favourites = () => {
    const favourites = useSelector((state: RootState) => state.favourites.favourites);

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom sx={{color: "white"}}>Избранное</Typography>
            <Grid container spacing={2}>
                {
                    favourites?.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                            <FilmCard
                                id={movie.id}
                                name={movie.name}
                                rating={movie.rating}
                                poster={movie.poster}
                                year={movie.year}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
};

export default Favourites;