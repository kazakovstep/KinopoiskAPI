import {Box, CardContent, CardMedia, Chip, CircularProgress, Container, Grid, Typography} from "@mui/material";
import styles from "./filmPage.module.scss";
import kpImage from "../../../shared/assets/kp.png";
import imdbImage from "../../../shared/assets/imdb.png";
import {useGetMovieByIdQuery} from "../../../app/store/api/movies.api.ts";
import {useParams} from "react-router-dom";
import emptyImage from "../../../shared/assets/empty.png";


export const FilmPage = () => {
    const {id} = useParams<{ id: string }>();

    const parsedId = id ? parseInt(id, 10) : NaN;

    const {data: movie, isLoading, error} = useGetMovieByIdQuery({id: parsedId});

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography variant="h6" color="error">Error loading movie.</Typography>;
    }

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <CardMedia
                        sx={{marginTop: "25px"}}
                        component="img"
                        image={movie?.poster?.previewUrl || emptyImage}
                        alt={movie?.name}
                        title={movie?.name}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <CardContent>
                        <Typography variant="h3" gutterBottom className={styles.ratingText}>
                            {movie?.name || "Без названия"}
                        </Typography>
                        <Typography variant="h6" gutterBottom className={styles.ratingText}>
                            Описание
                        </Typography>
                        <Typography variant="body1" paragraph className={styles.ratingText}>
                            {movie?.description || "Без описания"}
                        </Typography>
                        <div className={styles.ratingContainer}>
                            <div className={styles.ratingBlock}>
                                <img className={styles.kpimage} src={kpImage} alt="KP Image"/>
                                <Typography className={styles.ratingText}>
                                    {movie?.rating.kp}
                                </Typography>
                            </div>
                            <div className={styles.ratingBlock}>
                                <img className={styles.imdbimage} src={imdbImage} alt="imdb Image"/>
                                <Typography className={styles.ratingText}>
                                    {movie?.rating.imdb}
                                </Typography>
                            </div>
                        </div>
                        <Typography variant="h6" gutterBottom className={styles.ratingText}>
                            Жанры
                        </Typography>
                        <Box>
                            {movie?.genres.map((genre, index) => (
                                <Chip key={index} label={genre.name} variant="outlined" className={styles.ratingText}/>
                            ))}
                        </Box>
                        <Typography variant="h6" gutterBottom mt={2} className={styles.ratingText}>
                            Год выпуска
                        </Typography>
                        <Typography variant="body1" className={styles.ratingText}>
                            {movie?.year}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Container>
    );
}