
import { F } from 'ts-toolbelt'
import { functions } from "./functions"

type CurryAllable<T, A0> = {
    [K in keyof T]: T[K] extends F.Function ? (a0: A0, ...args: any) => any :
    T[K] extends object ? CurryAllable<T[K], A0> : T[K]
}

type CurryAll<T, A0> = {
    [K in keyof T]: T[K] extends (a0: A0, ...args: infer A) => infer R ?
    (...args: A) => R : T[K] extends object ? CurryAll<T[K], A0> : T[K]
}

const curry = <Fn extends F.Function>(
	fn: Fn,
	...args: any[]
): F.Curry<typeof fn> => {
	return fn.bind(fn, ...args)
}

const curryAll = <T extends CurryAllable<T, A0>, A0>(obj: T, val: A0): CurryAll<T, A0> => {
	return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => {
            if (typeof v === 'function') {
                return [k, curry(v as any, val)]
            } else if (v && typeof v === "object") {
                return [k, curryAll(v, val)]
            } else {
                return [k, v]
            }
        })
    ) as CurryAll<T, A0>;
}

/*
 * It takes a value, and returns an object with all the functions in `functions`
 * curried with that value
 * @param {any} a - any - the value to test
 * @returns An object with all the functions in the functions object.
 */
export default function expect<A0>(a: A0): CurryAll<typeof functions, A0> {
	// @ts-ignore
	return curryAll(functions, a) as CurryAll<typeof functions, A0>
}