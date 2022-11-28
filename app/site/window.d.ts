import * as htmx from "htmx.org";
// import * as hyperscript from "hyperscript.org";

export {};

declare global {
    interface Window {
        htmx;
        // hyperscript;
    }
}
