import { builder } from './sublimeBuilder.js'
import {
  fileThemeMerge,
  mockPath,
  themeColors,
  themeData,
  themeRules,
  themeVars
} from './__mocks__/mockData.js'
import { watchDir } from './watchDir.js'

jest.mock('./watchDir.js', () => ({
  watchDir: jest.fn()
}))

const buildFile = (name) => {
  if (name === 'test-merge') {
    builder(
      'merge',
      themeData.mergeFiles,
      themeData.title,
      themeData.author,
      themeData.license,
      fileThemeMerge
    )
  }
}

const themeWatch = {
  folderPath: mockPath,
  folder: 'mock',
  themes: [
    {
      name: 'test-merge',
      filenames: [themeVars, themeRules, themeColors]
    }
  ]
}

describe('watchDir test', () => {
  test('defines a function', () => {
    expect(typeof watchDir).toBe('function')
    expect(watchDir).toBeTruthy()
  })

  test('test watchDir parameters', () => {
    const watcher = watchDir(
      themeWatch.folderPath, themeWatch.folder, themeWatch.themes, buildFile
    )
    expect(watcher).toBeUndefined()
    expect(watchDir.mock.calls.length).toBe(1)
    expect(watchDir.mock.calls[0][0]).toBe(themeWatch.folderPath)
    expect(typeof watchDir.mock.calls[0][0]).toBe('string')
    expect(watchDir.mock.calls[0][1]).toBe(themeWatch.folder)
    expect(typeof watchDir.mock.calls[0][1]).toBe('string')
    expect(watchDir.mock.calls[0][2]).toBe(themeWatch.themes)
    expect(Array.isArray(watchDir.mock.calls[0][2])).toBe(true)
    expect(watchDir.mock.calls[0][3]).toBe(buildFile)
    expect(typeof watchDir.mock.calls[0][3]).toBe('function')
  })
})
