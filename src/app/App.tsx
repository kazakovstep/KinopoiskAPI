import React from 'react';
import {Providers} from "./providers";
import AppRouter from "./routers/appRouter";
import {BrowserRouter} from "react-router-dom";

export const App: React.FC = () => {
    return (
        <Providers>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </Providers>
    );
}
export default App;
