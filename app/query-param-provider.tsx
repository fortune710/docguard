'use client'

import React from "react";
import { QueryParamProvider as Provider } from 'use-query-params';
import Adapter from 'next-query-params/app'

export default function QueryParamProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider adapter={Adapter}>
            { children }
        </Provider>
    )
}