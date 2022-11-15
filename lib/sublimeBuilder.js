import * as fs from 'fs'
import { Counter } from '../helpers/Counter.js'
import { ProgressBar } from '../helpers/ProgressBar.js'
import { arrayInclude } from '../helpers/arrayInclude.js'
import { color } from '../helpers/messageColor.js'
import { globalsKeys } from '../helpers/strNumbers.js'

const convertJson = (data) => JSON.parse(JSON.stringify(data))
// Clean regex and comments.
const replaceData = (data) => data
  .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? '' : m)
  .replace(/(^[ \t]*\n)/gm, '')

/**
 * Read sublime text file (json with comments) and clean, regex and comments.
 * @returns {string}.
 */
function getAndCleanFile (pFile) {
  try {
    const data = fs.readFileSync(pFile, 'utf8')
    // structuredClone added on node v17.0.0
    // Option convertJson - JSON.parse/stringfy
    const str = structuredClone(replaceData(data))
    return str
  } catch (e) {
    console.log(color('Error: ', 'red'), e)
  }
}

// Convert to Object. Option to JSON parse.
// Unsafe, bypass synthax error in file. E.g. comma on last lines.
const convertObj = (str) => eval('(' + str + ')')

/**
 * Read and convert to object.
 * @returns {Object}.
 */
function readAndConvertJson (file) {
  const strFile = getAndCleanFile(file)
  const jsonFile = JSON.parse(strFile)
  return jsonFile
}

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 * @see https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
function mergeDeep (...objects) {
  const isObject = obj => obj && typeof obj === 'object'
  return objects.reduce((prev, obj) => {
    Object.keys(obj)
      .filter((v) => v !== 'extends')
      .filter((v) => v !== 'name')
      .forEach(key => {
        const pVal = prev[key]
        const oVal = obj[key]
        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = pVal.concat(...oVal)
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal)
        } else {
          prev[key] = oVal
        }
      })
    return prev
  }, {})
}

// Instantiate progress bar and counters.
const Bar = new ProgressBar()
const Count = new Counter()
const Count2 = new Counter()

/**
 * Replace variables keys with values in rules themes or globals/rules color-schemes.
 * Takes around 1 min for theme building. Appear that with for loops was faster.
 * @param {Object} sublime text rules.
 * @param {Array.<Object>} sublime text variables - E.g. colors-pallete and adaptive-vars files.
 * @returns {Object} sublime file rules - Variables replaced.
 */
function replaceVars (obj, arr) {
  const total = Count2.total(obj)
  // Progress bar smoother when use numbers instead of Counter.total method. Same time for building,
  // but with Counter.total method, bar is slow until 25% then finishes instantaneous.
  // Theme slow until 25%, Color-scheme 30%.
  // console.log(Count.add(obj)); // Get total by key
  const result = Object.entries(obj)
    .filter((v) => v !== 'extends')
    .map(([k, v]) => {
      if (v == null) {
        return null
      } else if (v.length === 0 && typeof v === 'string') {
        return v
      } else if (typeof v === 'boolean') {
        return v === false || v === true
      } else if (typeof v === 'object') {
        replaceVars(v, arr)
      } else {
        // Running twice because vars reused inside same file as values. E.g. var(vcs-deleted)
        Array.from(Array(2)).forEach(i2 => {
          arr.map(obj2 =>
            Object.entries(obj2.variables).map(([k2, v2]) => {
              Object.entries(k2).forEach(v3 => {
                const key3 = 'var(' + k2 + ')'
                const value3 = JSON.stringify(v2)
                obj[k] = typeof v2 !== 'object' ? obj[k].toString().replaceAll(key3, v2) : obj[k]
                // Probably better option try check if scheme or theme instead of keys.
                // Failed to check parent key globals presence.
                // Theme files using {number}, but color-scheme files use {string} numbers.
                obj[k] = isFinite(obj[k]) && !arrayInclude(globalsKeys, k) ? +obj[k] : obj[k]
                obj[k] = typeof v2 === 'object' && v === key3 ? obj[k] = value3 : obj[k]
                // Return empty vars that change to 0. E.g. "var(selection-fg)" = ""
                obj[k] = obj[k] === 0 && typeof v === 'string' ? obj[k] = '' : obj[k]
              })
              return { [k]: obj[k] }
            })
          )
        })
      }
      return { [k]: obj[k] }
    })
  Bar.start(total)
  const curr = Count.add(obj)
  Bar.update(curr)

  return Object.assign({}, ...result)
}

const license = (title, author, licenseName) =>
`/**
 * @file ${title}
 * @copyright ${author}
 * @license ${licenseName}
 */
`

const messageSaved = (name) => `${name} saved.`

/*
 * Add elements to object.
 * @returns {Object}.
 */
const addElements = (e, o) => {
  Object.entries(e).forEach(([k, v]) => {
    o[k] = v
  })
  return o
}

const capitalize = s => s != null ? s[0].toUpperCase() + s.slice(1) : null

// Need if using ReplaceVars, replace for stringfy objects values on st variables,
// E.g. "{\"target\":1,\"speed\":4,\"interpolation\":\"smoothstep\"}"
const replaceData2 = (data) => data.replace(/\\"/g, '"')
  .replace(/("\{|\}")/g, m => m === '"{' ? '{' : '}')

/**
 * Write file with license text and key name(color-schemes has this key).
 * @returns {Object} json with comments - Sublime text file.
 */
function writeStFile (jsonFile, title, author, licenseName, filename, keyname) {
  try {
    const keyName = { name: capitalize(keyname) }
    const updateFile = keyname == null ? jsonFile : addElements(jsonFile, keyName)
    const str = replaceData2(JSON.stringify((updateFile), null, 4))
    const copyright = license(title, author, licenseName)
    const themeLicense = copyright + str
    fs.writeFileSync(filename, themeLicense, null, 4)
    console.log(color(messageSaved(title), 'yellow'))
    return themeLicense
  } catch (e) {
    console.log(color('Error: ', 'red'), e)
  }
}

const messageErrorKind = 'You must use merge or replace for kind'

/**
 * Builder: read json, merge files or replace variables, write sublime text file.
 * @param {string} kind - Should be merge or replace
 * @param {Array.<Object>} stfiles - Sublime Text files.
 * Merge order stFiles: 1. colors, 2. vars, 3. rules.
 * Replace order stFiles: 1. vars, 2. colors.
 * @param {string} title - Title is used on top of build file together with license and author.
 * E.g. 'Treble Adaptive.sublime-theme - Treble Adaptive'
 * @param {string} author - Author name appear at top of build file.
 * @param {string} licenseName - Software license agreement at top of build file.
 * @param {string} filename - Filename with extension. E.g. Treble Adaptive.sublime-theme
 * @param {string} keyname - Color-schemes has a key 'name' at top of file. E.g. "name": "Blackcomb"
 * @param {Object} rulesFile - Replace option, all rules and globals will have variables values
 * replaced.
 * @example theme,
 * builder(
 *   'merge',
 *   adaptiveData.mergeFiles,
 *   adaptiveData.title,
 *   adaptiveData.author,
 *   adaptiveData.license,
 *   adaptiveData.filename
 * )
 * @example theme,
 * builder(
 *   'replace',
 *   adaptiveData.replaceFiles,
 *   adaptiveData.title,
 *   adaptiveData.author,
 *   adaptiveData.license,
 *   adaptiveData.filename,
 *   null,
 *   adaptiveData.rules
 * )
 * @example scheme,
 * builder(
 *   'merge',
 *   bcData.mergeFiles,
 *   bcData.title,
 *   bcData.author,
 *   bcData.license,
 *   bcData.filename,
 *   bcData.name
 * )
 * @example scheme,
 * builder(
 *   'replace',
 *   bcData.replaceFiles,
 *   bcData.title,
 *   bcData.author,
 *   bcData.license,
 *   bcData.filename,
 *   bcData.name,
 *   bcData.rules
 * )
 * @returns {Object} json with comments - Sublime text file.
 */
export function builder (kind, stFiles, title, author, licenseName, filename, keyname, rulesFile) {
  if (!['merge', 'replace'].includes(kind)) {
    console.log(color(messageErrorKind, 'red'))
    return messageErrorKind
  } else {
    const filesArray = stFiles.map(readAndConvertJson)
    if (kind === 'merge') {
      const mergeFile = mergeDeep(...filesArray)
      const buildFile = writeStFile(mergeFile, title, author, licenseName, filename, keyname)
      return buildFile
    } else if (kind === 'replace') {
      const baseFile = readAndConvertJson(rulesFile)
      const replaceFile = replaceVars(baseFile, filesArray)
      const buildFile = writeStFile(replaceFile, title, author, licenseName, filename, keyname)
      // Reset counters for Watch. Otherwise, counters accumulate on each run and mess progress bar.
      Count.reset()
      Count2.reset()
      return buildFile
    }
  }
}
