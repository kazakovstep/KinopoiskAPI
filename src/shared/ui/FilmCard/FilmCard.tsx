import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActionArea,
    CardActions,
    Button
} from '@mui/material';
import kpImage from "../../assets/kp.png";
import imdbImage from "../../assets/imdb.png";
import styles from "./FilmCard.module.scss";
import { Link } from "react-router-dom";
import emptyImage from "../../assets/empty.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store.ts";
import { toggleFavourite } from "../../../app/store/slices/favourites.slice.ts";

export interface ICardContent {
    id: number;
    name: string;
    rating: {
        kp: number;
        imdb: number;
        filmCritics: number;
        russianFilmCritics: number;
        await: number;
    },
    year: number;
    poster: {
        previewUrl: string;
    };
}

export const FilmCard = ({
                             id,
                             name,
                             rating,
                             year,
                             poster
                         }: ICardContent) => {
    const dispatch = useDispatch();
    const favourites = useSelector((state: RootState) => state.favourites.favourites);
    const isFavourite = favourites.some((movie: ICardContent) => movie.id === id);

    const handleToggleFavourite = () => {
        dispatch(toggleFavourite({ id, name, rating, year, poster }));
    };

    return (
        <Card className={styles.card}>
            <Link to={`/movie/${id}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={name}
                        className={styles.cardMedia}
                        image={poster?.previewUrl || emptyImage}
                        title={name}
                    />
                    <CardContent className={styles.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name || "Без названия"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Год выпуска: {year}
                        </Typography>
                        <div className={styles.ratingContainer}>
                            <div className={styles.ratingBlock}>
                                <img className={styles.kpimage} src={kpImage} alt="KP Image" />
                                <Typography className={styles.ratingText}>
                                    {rating.kp}
                                </Typography>
                            </div>
                            <div className={styles.ratingBlock}>
                                <img className={styles.imdbimage} src={imdbImage} alt="imdb Image" />
                                <Typography className={styles.ratingText}>
                                    {rating.imdb}
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                <Button size="small" color="primary" onClick={handleToggleFavourite}>
                    {isFavourite ? "В избранном" : "Добавить в избранное"}
                </Button>
                <Link to={`/movie/${id}`}>
                    <Button size="small" color="primary">
                        Узнать больше
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};
