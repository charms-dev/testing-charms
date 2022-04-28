import { run, bench, group, baseline } from 'mitata'
import * as expect from '../dist/index.mjs'
import { expect as jestExpect} from 'expect'
import { expect as chaiExpect} from 'chai'
import * as uvuExpect from 'uvu/assert'

group('simple', () => {
	baseline('charm', () => {
		expect.equals("test", "test")
	})
	bench('jest', () => {
		jestExpect('test').toBe('test')
		jestExpect('test').not.toBe('nottest')
	})
	bench('chai', () => {
		chaiExpect('test').equals('test')
		chaiExpect('test').not.equals('nottest')
	})
	bench('uvu', () => {
		uvuExpect.is('test', 'test')
		uvuExpect.is.not('test', 'nottest')
	})
})

run()
