import { FC, Fragment, PropsWithChildren } from "react";
import { Show } from "../../../renderer/Show";
import { pickRandomWords, WordList } from "./CodenamesWordList";
import { ScriptTag } from "./Hyperscript";
import { integerRange } from "./IsomorphicUtilities";

export type PatternFunction = (index: number) => boolean;
export const emptyPattern: PatternFunction = () => false;

let javascript = ``;
let hyperscript = `
-- init
-- NOTE: I can't figure how to make an event target and listen just to it dynamically.
--   make an EventTarget
--   set global $Bus to the result
--   trigger test on $Bus
-- end
-- on test from $Bus
--     log 'hi'
-- end

init
    trigger test on $Bus
end

on test from $Bus
    log 'Bus test is operational'
end

behavior paintable(index)
    init
        set element myCycle to ["cpnt-codenames-codepad__red", "cpnt-codenames-codepad__blank"]
    end

    def paintOurs(color)
        remove .{myCycle[1]}
        add .{myCycle[0]}
    end

    def paintTheirs(color)
        remove .{myCycle[0]}
        add .{myCycle[1]}
    end

    def paintOursNotTheirs(isOurs)
        if isOurs then paintOurs() end
        if not isOurs then paintTheirs() end
    end
end


def booleansToBinary(list)
    make an Array called answer
    repeat for b in list
        if b then answer.push("1") end
        if not b then answer.push("0") end
    end
    return answer.reverse()
end

def binaryToBooleans(list)
    make an Array called answer
    repeat for b in list
        if b is "1" then answer.push(true) end
        if b is "0" then answer.push(false) end
    end
    return answer.reverse()
end


`

javascript += `
console.log('Codenames Codepad JavaScript setup')
const $Bus = new EventTarget();
window.$Bus = $Bus;
`

export const Script: FC = () =>
    <Fragment>
        <ScriptTag type="text/javascript">{javascript}</ScriptTag>
        <ScriptTag>{hyperscript}</ScriptTag>
    </Fragment>

export type ChildrenList = Array<FC<any>>

hyperscript += `
behavior codenamesCodePadStateManagerTMPatentPending(count, decimalValue)
    init
        get _reset()
        set element bits to the result
    end

    on "toggle bit"(index) from closest <[data-codenames] />
        set element bits[index] to not bits[index]
        trigger "bit was set"(bit: index, isOurs: bits[index]) on closest <[data-codenames] />
        trigger "bits were set"(bits: bits) on closest <[data-codenames] />
    end

    on "set bits"(to) from closest <[data-codenames] />
        set element bits to to
        trigger "bits were set"(bits: bits) on closest <[data-codenames] />

        repeat for value in bits index bit
          trigger "bit was set"(bit: bit, isOurs: value) on closest <[data-codenames] />
        end
    end

    def _reset

        get decimalValue.toString(2)
        get it.padStart(count, "0")
        get it.split("")
        get binaryToBooleans(it)
        return the result

    end

    on reset from closest <[data-codenames] />
        get _reset()
        trigger "set bits"(to: the result) on closest <[data-codenames] />
    end
end

`

export const CodenamesCodePadStateManagerTMPatentPending: FC<{ count: number, pattern?: PatternFunction, words?: WordList, decimalValue?: number }> =
    ({ count, decimalValue }) => {
        return <div data-script={`install codenamesCodePadStateManagerTMPatentPending(count: ${count}, decimalValue: ${decimalValue})`} />
    }

/**
 * Usage:
 * <CodenamesCodePadShell count={count} children={[
 *      Codepad,
 *      Binary,
 *      Decimal,
 *      Reset,
 *      ToggleWordsOrIndices,
 *      MathTable
 *  ]} />
 *
 *
 *  Props:
 *
 *  count { number? } Optional, defaults to 25.
 *  pattern { PatternFunction? } Optional, defaults to `emptyPattern`.
 *  decimalValue { number? } Optional. If provided, overrides pattern to match
 *      this decimal number
 *  words { WordList? } Optional, defaults to a different, random 25 words
 *      from internal list each call.
 *  children { ChildrenList }
 *       Array of components. For each "Child" in the array, the shell adds
 *       `<Child {...props} />` to its children.
 **/
// @ts-ignore
export const CodenamesCodePadShell: FC<{ children: ChildrenList, className?: string, count?: number, pattern?: PatternFunction, words?: WordList, decimalValue?: number, decimalLabel?: string }> =
    ({ children, count = 25, pattern = emptyPattern, words = pickRandomWords(count), decimalValue, decimalLabel, className }) => {
        // DecimalValue just overrides the pattern to a pattern which matches that value.
        if (typeof decimalValue === 'number') {
            let decimalAsBinary = decimalValue.toString(2).padStart(count, "0").split("").reverse()

            pattern = (index) => decimalAsBinary[index] === "1";
        }

        return <div data-codenames className={`${className}`}>
            <CodenamesCodePadStateManagerTMPatentPending {...{ count, pattern, words, decimalValue }} />
            {
                // @ts-ignore
                children.map((Child) => <Child {...{ count, pattern, words, decimalValue, decimalLabel }} />)
            }
        </div>
    }

export const MathTable: FC<{ count: number, pattern?: PatternFunction, decimalValue?: number }> = ({ count, pattern = emptyPattern, decimalValue = "" }) =>
    <Fragment>
        <p>Do the math:</p>
        <button data-script={`on click toggle .hidden on next <table />`}>Show math</button>
        <div>
            <table className="hidden">
                <thead>
                    <th className="text-left px-sm">Position</th>
                    <th className="text-left">Power of 2</th>
                    <th className="text-right px-sm">Contribution</th>
                </thead>
                {integerRange(count).reverse().map(index => <MathTerm index={index} isOurs={pattern(index)} />)}
                <tr>
                    <td className="text-right px-sm" colSpan={3}>
                        <Decimal {...{ count, decimalValue }} />
                    </td>
                </tr>
            </table>
        </div>
    </Fragment>

hyperscript += `
behavior mathTerm(index)
    on click
        trigger "toggle bit"(index: index) on closest <[data-codenames] />
    end

    on "bit was set"(bit, isOurs) from closest <[data-codenames] /> queue last
        if bit is not index then halt end

        paintOursNotTheirs(isOurs)

        if isOurs remove .hidden from <[data-contributing] /> in me end
        if not isOurs add .hidden to <[data-contributing] /> in me end
    end
end
`

export const MathTerm: FC<{ index: number, isOurs: boolean }> = ({ index, isOurs }) => {
    return <tr data-script={`install mathTerm(index: ${index}) install paintable(index: ${index})`}
        className={`cpnt-codenames-codepad__${isOurs ? "red" : "blank"} cursor-pointer`}
    >
        <td className="px-sm w-2xl">{index}</td>
        <td>2<sup>{index}</sup> = {Math.pow(2, index)}</td>
        <td className={`text-right px-sm `} ><span className={`${isOurs ? undefined : 'hidden'}`} data-contributing>{Math.pow(2, index)}</span></td>
    </tr>
}

/**
 * The decimal representation input & output (because it updates)
 */
hyperscript += `
behavior decimal(count)
    on input queue last
log my value
        get my value as Number
        get it.toString(2)
        get it.padStart(count, "0")
        get it.split("")
        get binaryToBooleans(it)
        trigger "set bits"(to: the result) on closest <[data-codenames] />
    end

    on "bits were set"(bits) from closest <[data-codenames] />
        get booleansToBinary(bits)
        get it.join('')
        get parseInt(the result, 2)
        if the result is my value then halt end
        put the result into my value
    end
end
`
export const Decimal: FC<{ count: number, decimalValue?: number | string, decimalLabel?: string }> =
    ({ count, decimalValue = '', decimalLabel = 'Decimal:' }) =>
        <label className="my-md justify-end">
            {decimalLabel}
            <input type="number" name="decimal" value={decimalValue} min="0" max={Math.pow(2, count) - 1}
                data-script={`install decimal(count: ${count})`}
            />
        </label>

/**
 * The binary representation, a series of binary digits (bits) with an axis label
 */
export const Binary: FC<{ count: number, pattern?: PatternFunction }> = ({ count, pattern = emptyPattern }) =>
    <Fragment>
        <p>Binary:</p>
        <table className="w-full border-none table-fixed my-md" cellSpacing="0" cellPadding="0">
            <tr>
                {
                    integerRange(count).reverse().map(index =>
                        <td className="border-none m-0 font-mono">
                            <BinaryDigit index={index} value={pattern(index) ? 1 : 0} />
                        </td>)
                }
            </tr>
            <tfoot className="text-xs">
                <tr>
                    {
                        integerRange(count).reverse().map(index =>
                            <th className="pt-sm">
                                <span className="text-xs">
                                    <Show when={index % 2 == 0}>
                                        <span className="text-gray-600">2<sup>{index}</sup></span>
                                    </Show>
                                </span>
                            </th>)
                    }
                </tr>
            </tfoot>
        </table>
    </Fragment>


/**
 * Binary digit in the binary string box
 */
hyperscript += `
behavior binaryDigit(index)
    on click
        trigger "toggle bit"(index: index) on the closest <[data-codenames] />
    end

    on "bit was set"(bit, isOurs) from the closest <[data-codenames] /> queue last
        if bit is not index then halt end

        paintOursNotTheirs(isOurs)

        if isOurs then put "1" into me end
        if not isOurs then put "0" into me end
    end
end
`
export const BinaryDigit: FC<{ index: string | number, value: string | number }> = ({ index, value }) =>
    <button
        className={`cpnt-codenames-codepad__${value ? "red" : "blank"} w-full cursor-pointer`}
        data-script={`install binaryDigit(index: ${index}) install paintable(index : ${index})`}
    >
        {value}
    </button>

/**
 * Codepad is the grid containing all the codename cards
 */
export const Codepad: FC<{ count: number, pattern?: PatternFunction, words: WordList }> = ({ count, pattern = emptyPattern, words = pickRandomWords(count) }) =>
    <div className="cpnt-codenames-codepad"
        data-side-length={Math.round(Math.sqrt(count))}
        /* First load we want no flicker, so set the style directly */
        style={{ "--cpnt-codenames-codepad-grid-side-length": Math.round(Math.sqrt(count)) }}
    >
        {
            integerRange(count).reverse().map(
                index =>
                    <Fragment>
                        <CodenameCard index={index} color={pattern(index) ? 'red' : 'blank'}>
                            {words[index]}
                        </CodenameCard>
                        {/*
                            This is intentionally invisible to the user, but will
                            be included if they select all the text boxes

                            Also, zero's the last one, so no comma after it
                          */}
                        <Show when={index !== 0}>
                            <span className="absolute top-0 left-0 w-0 h-0 block">, </span>
                        </Show>
                    </Fragment>
            )
        }
    </div>


/**
 * CodenameCard in the codepad grid
 */

hyperscript += `
behavior codenameCard(index)
    on click
        trigger "toggle bit"(index: index) on the closest <[data-codenames] />
    end

    on "bit was set"(bit, isOurs) from the closest <[data-codenames] /> queue last
        if index is not bit then halt end

        paintOursNotTheirs(isOurs)
    end

    on "toggle words or indices" from the closest <[data-codenames] />
        toggle .hidden on <[data-toggle-words] /> in me
    end
end
`


export const CodenameCard: FC<PropsWithChildren<{ index: number, color: 'red' | 'blank' }>> = ({ index, color, children }) =>
    <button
        data-script={`install codenameCard(index: ${index}) install paintable(index: ${index})`}
        className={`cpnt-codenames-codepad__${color} cursor-pointer font-mono text-sm p-sm max-w-full min-w-full`}
    ><span data-toggle-words>{children}</span> <span data-toggle-words className="hidden">{index}</span></button>

/**
 * Buttons to do common actions
 */
export const Reset: FC = () => <button className="cpnt-button mr-md !bg-red-800 !text-white" data-script={`
    on click trigger reset on closest <[data-codenames] />
`}>Reset</button>

export const ToggleWordsOrIndices: FC = () =>
    <button className="cpnt-button mr-md !bg-red-800 !text-white" data-script={`
    on click
        trigger "toggle words or indices" on closest <[data-codenames] />
        toggle .hidden on <[data-toggle-hidden] /> in me`}>
        <span data-toggle-hidden>Show numbers</span>
        <span data-toggle-hidden className="hidden">Show words</span>
    </button>
