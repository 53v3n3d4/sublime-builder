import { Counter } from './Counter.js'

describe('Counter test', () => {
  const Count = new Counter()
  expect(Count).toBeTruthy()
  const addSpy = jest.spyOn(Count, 'add')
  const resetSpy = jest.spyOn(Count, 'reset')
  const totalSpy = jest.spyOn(Count, 'total')

  beforeEach(() => {
    addSpy.mockClear()
    resetSpy.mockClear()
    totalSpy.mockClear()
  })

  describe('add', () => {
    test('defines add function', () => {
      expect(typeof Count.add).toBe('function')
    })

    test('get total length object', () => {
      Count.add(rules)
      expect(addSpy).toHaveBeenCalledWith(rules)
      expect(addSpy).toHaveBeenCalledWith(expect.any(Object))
      expect(addSpy).toHaveReturnedWith(3)
      expect(addSpy).toHaveReturnedWith(expect.any(Number))
    })
  })

  describe('reset', () => {
    test('defines reset function', () => {
      expect(typeof Count.reset).toBe('function')
    })

    test('reset counter', () => {
      Count.reset()
      expect(resetSpy).toHaveBeenCalledWith()
    })
  })

  describe('.total', () => {
    test('defines total function', () => {
      expect(typeof Count.total).toBe('function')
    })

    test('get total length nested object', () => {
      Count.total(rules)
      expect(totalSpy).toHaveBeenCalledWith(rules)
      expect(totalSpy).toHaveBeenCalledWith(expect.any(Object))
      expect(totalSpy).toHaveReturnedWith(3)
      expect(totalSpy).toHaveReturnedWith(expect.any(Number))
    })
  })
})

const rules = {
  extends: 'dark-vars.hidden-theme',
  variables: {},
  rules:
    [
      /**
         *
         * WINDOWS
         *
         * Title bar
         *
         */
      {
        class: 'title_bar',
        bg: 'var(title-bar-bg)',
        style: 'system'
      }
    ]
}
