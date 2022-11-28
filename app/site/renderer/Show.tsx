import { PropsWithChildren } from "react";

export const Show: React.FC<PropsWithChildren<{ when: unknown }>> = ({ children, when }) => <>{when ? children : null}</>
