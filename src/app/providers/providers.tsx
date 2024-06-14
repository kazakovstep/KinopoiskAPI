import {Provider} from 'react-redux'
import React from "react";
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from "../store/store.ts";

interface IProviders {
    readonly children: React.ReactNode
}

export const Providers: React.FC<IProviders> = ({children}) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}