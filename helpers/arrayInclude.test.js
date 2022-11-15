import { arrayInclude } from './arrayInclude.js'

describe('test arrayInclude', () => {
  test('defines a function', () => {
    expect(typeof arrayInclude).toBe('function')
  })

  const arr = ['adaptive', 'dark', 'light']
  const str = 'adaptive'
  const str1 = 'wrong'

  test('test arrayInclude parameters', () => {
    arrayInclude(arr, str)
    expect(Array.isArray(arr)).toBe(true)
    expect(typeof str).toEqual('string')
  })

  test('test arrayInclude return true', () => {
    expect(arrayInclude(arr, str)).toBe(true)
  })

  test('test arrayInclude return false', () => {
    expect(arrayInclude(arr, str1)).toBe(false)
  })
})
