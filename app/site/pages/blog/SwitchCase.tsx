import { createContext, PropsWithChildren, useContext } from "react";
import { Fragment } from "react"

// @ts-ignore doc string
const usage = `
    Switch/Case effectively to use pattern matching syntax to choose which
    option to render.

    Usage:

    <Switch on={value}>

        <Case truthy>
            <p>Only rendered when "on" prop's value is truthy</p>
        </Case>

        <Case falsy>
            <p>"on" prop's value is falsy</p>
        </Case>

        <Case is={"this string"}>
            <p>"on" prop's value is the string "this string" (via JS's ==)</p>
        </Case>

        <Case eq={"this string"}>
            <p>"on" prop's value is the string "this string" (via JS's ===)</p>
        </Case>

        <Case otherwise>
            <p>None of the other Case's matched (not possible when both truthy and falsy are used) (like switch/case default) </p>
        </Case>

        I'm a text node inside Switch but outside Case, so I'm always shown unconditionally

        <Case>I'm inside Switch AND Case, but this Case has no qualifiers, so I'm always shown unconditionally</Case>

        <Case truthy>
            <p>I'm the bottom of the sandwich when value is truthy</p>
        </Case>
    </Switch>
`

/**
 * The communication bus for this family of components
 */
type SwitchCaseContextValue = {
    on?: any
}
const SwitchCaseContext = createContext<SwitchCaseContextValue>({ on: undefined });


/**
 * Like JS's (and many C-like languages) `switch(){}` syntax but with JSX XML
 * Shows all children, and lets Case's decide whether to render themselves
 */
type SwitchProps = {
    on: SwitchCaseContextValue["on"]
}
export const Switch: React.FC<PropsWithChildren<SwitchProps>> = ({ children, on }) => {
    return <SwitchCaseContext.Provider value={{ on }}>
        {children}
    </SwitchCaseContext.Provider>

}

/**
 * The Case holds the content and uses props to determine whether to display that content
 */
type CaseProps = {
    truthy?: boolean;
    falsy?: boolean;
    is?: any;
    eq?: any;
    otherwise?: boolean;
}
export const Case: React.FC<PropsWithChildren<CaseProps>> =
    ({ children, truthy, falsy, is, eq, otherwise }) => {
        const { on } = useContext(SwitchCaseContext);
        let show = false;

        // Having fun with labels and blocks in JS
        shouldShow: {
            // Empty Case is weird but we'll allow it
            if (!children) { show = false; break shouldShow; }
            if (on && truthy) { show = true; break shouldShow; }
            if (!on && falsy) { show = true; break shouldShow; }
            if (is && on == is) { show = true; break shouldShow; }
            if (eq && on === eq) { show = true; break shouldShow; }
            if (otherwise) { show = true; break shouldShow; }
        }

        return <Fragment>{show ? children : undefined}</Fragment>;
    }
