import { LogoSVG } from "./LogoSVGSymbol"

export const GlobalFooter: React.FC<{ className?: string }> = ({ className = '' }) =>
    <footer className={`mb-0 h-max layout-full cpnt-bleed-layout py-md mt-md self-end ${className}`}>
        <nav className="flex flex-row gap-md">
            <ul>
                <li>
                    <a href="/">
                        <LogoSVG />
                    </a>
                </li>
            </ul>
            <hr className="m-0" />
            <ul>
                <li>
                    <a href="#">back to top ↑</a>
                </li>
            </ul>
        </nav>
    </footer>
