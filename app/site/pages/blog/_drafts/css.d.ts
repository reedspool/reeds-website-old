// My css.d.ts file
import type * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        // Add a missing property
        WebkitRocketLauncher?: string;

        // Add a CSS Custom Property
        '--theme-color'?: 'black' | 'white';

        '--cpnt-codenames-codepad-grid-side-length'?: number;
        // ...or allow any other property
        // [index: string]: any;
    }
}
