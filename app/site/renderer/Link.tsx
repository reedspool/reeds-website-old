import { PropsWithChildren } from "react";

export const Link: React.FC<PropsWithChildren<{ href: string, className?: string }>> =
    ({ children, href, className = '' }) =>
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} className={className}>{children}</a>
