export const bindProps:
    <K>(fn: React.FC<K>, boundProps: Partial<K>) => React.FC<Partial<K>>
    =
    // This `as K` means that there is no type checking that you've got ALL
    // the correct props, however there is type checking on the types of
    // each prop, so that's a trade-off.
    //
    // One way to get around this challenge would be a
    // third parameter for "defaults" which is NOT Partial<K> but just K,
    // to guarantee that each prop is set to a correct value
    <K,>(fn: React.FC<K>, boundProps: Partial<K>) => (props) => fn({ ...boundProps, ...props } as K);

export const bindPropsPermanent =
    (fn: React.FC, boundProps: {}) =>
        (props: {}, ...rest: Array<any>) =>
            // The only difference is the order in which the props are spread
            // All other errors are lack of updating this because I don't use it
            fn({ ...props, ...boundProps, }, ...rest);

/* Can we add this as a prototype to Function so that it can chain abritrarily? */
/* declare global { interface Function { bindProps<K>(boundProps: K): ReturnType<typeof bindProps<K>> } }
* Function.prototype.bindProps = function <K>(boundProps: K) {
*     return bindProps(this as React.FC<K>, boundProps)
* } */
