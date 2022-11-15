import { ProgressBar } from './ProgressBar.js'

describe('Progress Bar test', () => {
  const Bar = new ProgressBar()
  expect(Bar).toBeTruthy()
  const startSpy = jest.spyOn(Bar, 'start')
  const updateSpy = jest.spyOn(Bar, 'update')

  beforeEach(() => {
    startSpy.mockClear()
    updateSpy.mockClear()
  })

  describe('.start', () => {
    test('defines start function', () => {
      expect(typeof Bar.start).toBe('function')
    })

    test('start total', () => {
      Bar.start(196)
      expect(startSpy).toHaveBeenCalledWith(196)
      expect(startSpy).toHaveBeenCalledWith(expect.any(Number))
    })
  })

  describe('.update', () => {
    test('defines update function', () => {
      expect(typeof Bar.update).toBe('function')
    })

    test('update current', () => {
      Bar.update(196)
      expect(updateSpy).toHaveBeenCalledWith(196)
      expect(updateSpy).toHaveBeenCalledWith(expect.any(Number))
    })
  })
})
