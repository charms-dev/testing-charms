import { dequal } from 'dequal'
import { F } from 'ts-toolbelt'

class Assertion extends Error {}

const $ = (message: string) => {
	throw new Assertion(message)
}

export const functions = {
	ok: (a: any) => {
		a || $(`Expected ${a} to be a truthy value!`)
	},
	is: (a: any, b: any) => {
		a === b || $(`Expected ${a} to be shallow-equal to ${b}!`)
	},
	equal: (a: any, b: any) => {
		dequal(a, b) || $(`Expected ${a} to be deep-equal to ${b}!`)
	},
	throws: (a: F.Function) => {
		try {
			a()
			$(`Expected Function "${a.name}" to throw!`)
		} catch (e) {
			if (e instanceof Assertion) throw e
		}
	},
	not: {
		ok: (a: any) => {
			a && $(`Expected ${a} to be a falsy value!`)
		},
		is: (a: any, b: any) => {
			a === b && $(`Expected ${a} to not be shallow-equal to ${b}!`)
		},
		equal: (a: any, b: any) => {
			dequal(a, b) && $(`Expected ${a} to not be deep-equal to ${b}!`)
		},
		throws: (a: F.Function) => {
			try {
				a()
			} catch (e) {
				$(`Expected "${a.name}" to not throw!`)
			}
		},
	},
}