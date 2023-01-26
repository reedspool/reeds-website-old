import { FC, PropsWithChildren } from "react";

// Never output a comment. MDX has no comment facility of its own so let's make one
export const Comment: FC<PropsWithChildren> = ({}) => null
