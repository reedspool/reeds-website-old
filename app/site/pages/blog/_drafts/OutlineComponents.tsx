import { FC, PropsWithChildren } from "react";
import { bindProps } from "../../../renderer/utilities/BindProps";


type OutlineCalloutProps = { title?: string };
export const OutlineHeading: FC<PropsWithChildren<OutlineCalloutProps>> =
    ({ children, title = "Outline" }) =>
        <div className="cpnts-outline relative hidden bg-flashybg/30 px-2 pt-1 pb-6 my-1">
            {children}
            <div className="absolute bottom-1 left-2 text-xs text-primaryfg/90">{title}</div>
        </div>
export const Editorial =
    bindProps(OutlineHeading, { title: "Editorial" })

const hsToggleOutline = (show) => `
${show && `
    init
        trigger click
    end
`}

on click
    toggle .hidden on .cpnts-outline
`
type OutlineControlProps = {
    show: boolean
}
export const OutlineControls: FC<OutlineControlProps> =
    ({ show }) =>
        <div className="flex flex-row gap-4 items-center top-0 sticky">
            <button data-script={hsToggleOutline(show)} className="cpnt-button">
                Show outline stuff
            </button>
        </div>
