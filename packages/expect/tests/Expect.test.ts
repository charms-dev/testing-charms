import expect from '../src/index'

import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('expect#equal', () => {
	expect('test').equal("test")
	expect('test').not.equal("nottest")

	assert.throws(() => expect('test').equal("nottest"))
	assert.throws(() => expect('test').not.equal("test"))
})

test('expect#is', () => {
	expect('test').is("test")
	expect('test').not.is("nottest")

	assert.throws(() => expect('test').is("nottest"))
	assert.throws(() => expect('test').not.is("test"))
})

test("expect#ok", () => {
	expect(true).ok()
	expect(false).not.ok()

	assert.throws(expect(false).ok)
	assert.throws(expect(true).not.ok)
})

test("expect#throws", () => {
	function error() { throw new Error() }
	function pass() {}

	expect(error).throws()
	expect(pass).not.throws()

	assert.throws(expect(pass).throws)
	assert.throws(expect(error).not.throws)
})

test.run()
