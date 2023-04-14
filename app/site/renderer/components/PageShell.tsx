import React, { FC, PropsWithChildren } from 'react'

// This is an empty shell right now but its a place to do React things for
// every page on the site, unlike DefaultLayout which can be overridden
export const PageShell: FC<PropsWithChildren> = ({ children }) =>
    <React.StrictMode> {children} </React.StrictMode>
