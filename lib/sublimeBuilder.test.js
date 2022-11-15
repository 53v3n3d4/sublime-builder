import { builder } from './sublimeBuilder.js'
import {
  errorFile, fileSchemeMerge, fileSchemeReplace, fileThemeMerge, fileThemeReplace, schemeData,
  themeData
} from './__mocks__/mockData.js'
import { schemeMerge } from './__mocks__/mockSchemeMerge.js'
import { schemeReplace } from './__mocks__/mockSchemeReplace.js'
import { themeMerge } from './__mocks__/mockThemeMerge.js'
import { themeReplace } from './__mocks__/mockThemeReplace.js'

describe('build theme and color-schemes files test', () => {
  test.each([
    [
      'merge',
      themeData.mergeFiles,
      themeData.title,
      themeData.author,
      themeData.license,
      fileThemeMerge,
      null,
      null,
      themeMerge
    ],
    [
      'replace',
      themeData.replaceFiles,
      themeData.title,
      themeData.author,
      themeData.license,
      fileThemeReplace,
      null,
      themeData.rules,
      themeReplace
    ]
  ])('returns build theme for kind %s', (a, b, c, d, e, f, g, h, expected) => {
    expect(builder(a, b, c, d, e, f, g, h)).toBe(expected)
    expect(typeof a).toEqual('string')
    expect(a === 'merge' || a === 'replace').toBe(true)
    expect(Array.isArray(b)).toBe(true)
    expect(typeof c).toEqual('string')
    expect(typeof d).toEqual('string')
    expect(typeof e).toEqual('string')
    expect(typeof f).toEqual('object')
    expect(g == null).toBe(true)
    expect(typeof g).toEqual('object')
    expect(typeof h).toEqual('object')
    expect(typeof expected).toEqual('string')
  })

  test.each([
    [
      'merge',
      schemeData.mergeFiles,
      schemeData.title,
      schemeData.author,
      schemeData.license,
      fileSchemeMerge,
      schemeData.name,
      null,
      schemeMerge
    ],
    [
      'replace',
      schemeData.replaceFiles,
      schemeData.title,
      schemeData.author,
      schemeData.license,
      fileSchemeReplace,
      schemeData.name,
      schemeData.rules,
      schemeReplace
    ]
  ])('returns build color-scheme for kind %s', (a, b, c, d, e, f, g, h, expected) => {
    expect(builder(a, b, c, d, e, f, g, h)).toBe(expected)
    expect(typeof a).toEqual('string')
    expect(a === 'merge' || a === 'replace').toBe(true)
    expect(Array.isArray(b)).toBe(true)
    expect(typeof c).toEqual('string')
    expect(typeof d).toEqual('string')
    expect(typeof e).toEqual('string')
    expect(typeof f).toEqual('object')
    expect(typeof g).toEqual('string')
    expect(typeof h).toEqual('object')
    expect(typeof expected).toEqual('string')
  })

  test('defines a function', () => {
    expect(typeof builder).toBe('function')
    expect(builder).toBeTruthy()
  })

  test('test error kind, not merge or replace', () => {
    const errorKind = builder('wrong')
    expect(errorKind).toBe('You must use merge or replace for kind')
    expect(typeof errorKind).toEqual('string')
  })

  test('test error for no such file or directory, getAndCleanFile method', () => {
    try {
      builder('merge', [errorFile])
    } catch (e) {
      expect(e).toBeTruthy()
      expect(e).toBeInstanceOf(SyntaxError)
    }
  })

  test('test error for filename with null parameter, writeStFile method', () => {
    try {
      builder(
        'merge', themeData.mergeFiles, themeData.title, themeData.author, themeData.license, null
      )
    } catch (e) {
      expect(e).toBeTruthy()
      expect(e).toBeInstanceOf(TypeError)
      expect(e).toThrow(/TypeError:/)
    }
  })
})
