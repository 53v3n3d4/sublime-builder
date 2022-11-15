import { color } from './messageColor.js'

describe('color options test', () => {
  test.each`
    a         | b             | expected
    ${'test'} | ${'cyan'}     | ${'\u001B[36mtest\u001b[0m'}
    ${'test'} | ${'gray'}     | ${'\u001B[90mtest\u001b[0m'}
    ${'test'} | ${'purple'}   | ${'\u001B[35mtest\u001b[0m'}
    ${'test'} | ${'red'}      | ${'\u001B[91mtest\u001b[0m'}
    ${'test'} | ${'yellow'}   | ${'\u001B[93mtest\u001b[0m'}
  `('returns $expected for color $b', ({ a, b, expected }) => {
    expect(color(a, b)).toBe(expected)
    expect(color(a, b)).toBeTruthy()
    expect(typeof a).toEqual('string')
    expect(typeof b).toEqual('string')
    expect(typeof expected).toEqual('string')
    expect(typeof color).toBe('function')
  })

  test('Test for param with wrong color', () => {
    expect(color('test', 'wrong-color')).toBe(
      'Use one of these color options: cyan, gray, purple, red or yellow.'
    )
  })
})
