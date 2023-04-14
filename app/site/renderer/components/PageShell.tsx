import React, { FC, PropsWithChildren } from 'react'
import { LogoSVGSymbol } from "./LogoSVGSymbol"
import { GlobalHeader } from "./GlobalHeader"
import { GlobalFooter } from "./GlobalFooter"

export const PageShell: FC<PropsWithChildren> = ({ children }) =>
    <React.StrictMode>
        <LogoSVGSymbol />
        <GlobalHeader />
        {children}
        <GlobalFooter />
    </React.StrictMode>
