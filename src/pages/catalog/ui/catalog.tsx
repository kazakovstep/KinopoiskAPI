import {FilmCard} from "../../../shared/ui/FilmCard/FilmCard";
import {Box, CircularProgress, Grid, Pagination, Typography} from "@mui/material";
import styles from "./catalog.module.scss"
import {useGetCatalogQuery} from "../../../app/store/api/movies.api.ts";
import {ChangeEvent, useState} from "react";
import {Filter} from "../../../widgets/filter/filter.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store/store.ts";

export const Catalog = () => {

    const [page, setPage] = useState(1);
    const genres = useSelector((state: RootState) => state.filter.genres);
    const rating = useSelector((state: RootState) => state.filter.rating);
    const year = useSelector((state: RootState) => state.filter.year);
    const {data: catalog, isLoading, isFetching, error} = useGetCatalogQuery({
        page, genres, year, rating
    });

    if (error) {
        return <Typography variant="h6" color="error">Error loading movie details.</Typography>;
    }
    const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0});
    };

    return (
        <Box display={"flex"}>
            <Filter/>
            <Box flex={1} p={2}>
                {isLoading || isFetching ?
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress/>
                    </Box> :
                    <>
                        <Grid container spacing={2} className={styles.catalog}>
                            {
                                catalog?.docs.map((movie) => (
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
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Pagination
                                count={catalog?.pages}
                                page={page}
                                onChange={handleChange}
                                color="primary"
                            />
                        </Box>
                    </>
                }
            </Box>
        </Box>
    )
        ;
};

export default Catalog;