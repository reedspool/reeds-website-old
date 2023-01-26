import { FC, PropsWithChildren } from "react";


export const bindProps =
    (fn: React.FC<any>, boundProps: any) =>
        (props: any, ...rest: any) =>
            fn({ ...boundProps, ...props }, ...rest);

// TODO: Better name would be "Script-Object"
export const Script: FC<PropsWithChildren<{
    Wrapper?: WrapperType
}>> = ({ children, Wrapper: W, ...rest }) => {
    if (!W) W = 'div';
    return <W data-script={children} {...rest}>{children}</W>
}

// TODO: Probably change name to HyperScriptElement, and then
// extract core as generic ScriptElement
export const ScriptTag: FC<PropsWithChildren<{ type?: string }>> = ({ children, type = "text/hyperscript" }) => {
    return <div dangerouslySetInnerHTML={{ __html: `<script type=${type}>${children}</script>` }} />
}

export const Output: FC<PropsWithChildren<{ className?: string }>> = ({ className }) =>
    <output data-script={`
    on print(msg) put (msg + '\n') at the end of <pre /> in me end
    on put(msg) put msg into <pre /> in me end
`} className={className}>
        <pre></pre>
    </output>

export type WrapperType = React.FC<any> | string;
export const ButtonFigureWrapper: React.FC<PropsWithChildren<{ "data-script": string; caption: string }>> =
    ({ "data-script": script, caption }) => <figure className="layout-popout">
        <figcaption>{caption}</figcaption>
        <pre className="max-h-[10rem]">
            {script.trim()}
        </pre>
        <button data-script={`
            on click
                remove .{\`max-h-[10rem]\`} from previous <pre />
                remove .{\`layout\-popout\`} from closest <figure />
                add .{\`layout\-full\`} to closest <figure />
                remove me
        `}
            className="cpnt-button block !bg-gray-800/80"><i className='bx bx-expand-vertical'></i>Show full script</button>

        <p >The above Hyperscript is applied to this button:</p>

        <button
            data-script={
                script +
                `
                   on click remove .hidden from next <figcaption /> end
                   on click remove .hidden from next <output /> end
                `
            }
            className="cpnt-button mb-md"><i className='bx bx-run'></i> Run</button>



        <figcaption className="hidden">Output:</figcaption>

        <Output className="hidden" />

    </figure>
