import { FC } from "react";

export type MapProps = {
    From: Array<{}>
    To: FC<any>
}
export const Map: FC<MapProps> =
    ({ From, To }) => <>{From.map((props) => To(props))}</>
