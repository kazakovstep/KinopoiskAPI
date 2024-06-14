import {
    Route, Routes
} from 'react-router-dom';
import "../styles/globals.scss";
import React from "react";
import {Catalog} from "../../pages/catalog";
import {FilmPage} from "../../pages/filmPage/ui/filmPage.tsx";
import {Favourites} from "../../pages/favourites";

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Catalog/>}/>
            <Route path={`/movie/:id`} element={<FilmPage/>}/>
            <Route path={`/favourites`} element={<Favourites/>}/>
        </Routes>
    );
};

export default AppRouter;