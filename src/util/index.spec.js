/* eslint-env jest */
import { arrayIntersection, numberWithSeparator } from './index'

describe('arrayIntersection', () => {
  const tests = [{
    message: 'Should return an empty array when args are not defined',
    args: [undefined, undefined],
    expected: []
  }, {
    message: 'Should return commons items',
    args: [['t1_azer', 't1_poiu', 't1_tyui'], ['t1_poiu', 't1_nbvc', 't1_azer']],
    expected: ['t1_azer', 't1_poiu']
  }, {
    message: 'Should only work on primitive types',
    args: [
      [
        { foo: 'bar' }, { foo: 'baz' },
        { fizz: 'buzz' }, { foo: 'bar' }
      ]
    ],
    expected: []
  }]

  tests.forEach(test => it(test.message, () => {
    expect(arrayIntersection(...test.args)).toEqual(test.expected)
  }))
})

describe('numberWithSeparator', () => {
  it('Should return a formatted number with spaces from a number', () => {
    expect(numberWithSeparator(1000000)).toEqual('1 000 000')
  })

  it('Should return a formatted number with spaces from a string', () => {
    expect(numberWithSeparator('1000000')).toEqual('1 000 000')
  })

  it('Should return a formatted number with commas', () => {
    expect(numberWithSeparator('1000000', ',')).toEqual('1,000,000')
  })

  it('Should return an unformatted number if lower than 1000', () => {
    expect(numberWithSeparator('100')).toEqual('100')
  })

  it('Should return the default argument if not a number or a string', () => {
    expect(numberWithSeparator([])).toEqual([])
  })
})
