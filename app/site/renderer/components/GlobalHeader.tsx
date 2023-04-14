import { LogoSVG } from "./LogoSVGSymbol"

export const GlobalHeader: React.FC<{ className?: string }> = ({ className = '' }) =>
    <header className={`sticky mt-0 mb-md h-max layout-full cpnt-bleed-layout py-md font-flashy ${className}`}>
        <nav className="flex flex-row gap-md">
            <ul>
                <li><a href="/">
                    <LogoSVG className="!mr-md" />
                    reed's website</a></li>
            </ul>
            <hr className="m-0" />
            <ul className="flex flex-row gap-md">
                <li><a href="/">home</a></li>
                <li><a href="/work.html">work</a></li>
            </ul>
        </nav>
    </header>
