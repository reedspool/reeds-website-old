import { FC, PropsWithChildren } from "react"

export const Spoilers: FC<PropsWithChildren> = ({ children }) =>
    <p className="layout-popout bg-yellow-300/20 border-2 border-flashyfg/40 rounded-md px-xl py-md ">
        This article contains <strong>spoilers</strong> for {children}
    </p>
