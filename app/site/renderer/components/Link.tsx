import { PropsWithChildren } from "react";

export type LinkProps =
    PropsWithChildren<
        {
            href: string,
            className?: string,
            target?: string
        }>
export const Link: React.FC<LinkProps> =
    ({ children, href, className = '', target }) =>
        <a href={href} target={target ? target : href.startsWith("http") ? "_blank" : undefined} className={className}>
            {children}
        </a>

export type IconLinkProps =
    LinkProps & {
        icon: string
    }
export const IconLink: React.FC<IconLinkProps> =
    ({ children, icon, ...rest }) =>
        <Link {...rest}>
            {children}
            {/* TODO: Make a new pkg to use these bx-icons everywhere. */}
            <i className={`bx bx-${icon} align-middle ml-sm inline-block`}></i>
        </Link>
