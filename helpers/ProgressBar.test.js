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

describe('test draw method', () => {
  let originalStdoutWrite
  let mockBar
  let Bar

  beforeAll(() => {
    originalStdoutWrite = process.stdout.write
    process.stdout.write = jest.fn()

    mockBar = jest.fn((length, char) => char.repeat(length))

    Bar = new ProgressBar()
    Bar.width = 30
    Bar.bar = mockBar
  })

  afterAll(() => {
    process.stdout.write = originalStdoutWrite
  })

  it('test process.stdout.isTTY is false', () => {
    process.stdout.isTTY = false

    Bar.draw(0.5)

    const completeBar = '='.repeat(16)
    const incompleteBar = '-'.repeat(15)

    expect(process.stdout.write).toHaveBeenCalledWith(
      `Building: [${completeBar}${incompleteBar}] | 50%`
    )
  })
})

describe('test start method', () => {
  let originalConsoleLog
  let Bar

  beforeAll(() => {
    originalConsoleLog = console.log
    console.log = jest.fn()

    Bar = new ProgressBar()
  })

  afterAll(() => {
    console.log = originalConsoleLog
  })

  it('set total correctly', () => {
    const totalValue = 100
    Bar.start(totalValue)

    expect(Bar.total).toBe(totalValue)
    expect(Bar.current).toBe(0)
  })

  it('test print error number message', () => {
    const invalidTotal = 'invalid'

    Bar.start(invalidTotal)

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Should be a number.')
    )
  })
})
