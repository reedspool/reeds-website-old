import { PropsWithChildren } from "react";
import { GlobalFooter } from "./GlobalFooter";
import { GlobalHeader } from "./GlobalHeader";
import { LogoSVGSymbol } from "./LogoSVGSymbol";

export const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) =>
    <>
        <LogoSVGSymbol />
        <GlobalHeader />
        {children}
        <GlobalFooter />
    </>
