import chokidar from 'chokidar'
import { arrayInclude } from '../helpers/arrayInclude.js'
import { color } from '../helpers/messageColor.js'

const messageReady = (folder) =>
  `Initial scan complete on ${folder} folder. Ready for changes`

/**
 * Watch directory for changes in files.
 * @param {string} stFolder - Path folder that will be watched.
 * @param {string} folderName - Used in messageReady method on console.
 * @param {Array.<Object>} stFilenames - Array of objects with keys, name and filenames, for each
 * theme/color-scheme.
 * @param {Function} fn - Build function to call when file change.
 * @example {Object} themeWatch,
 * {
 *   folderPath: themePath,
 *   folder: 'theme',
 *   themes: [
 *     {
 *       name: 'adaptive-merge',
 *       filenames: [adaptiveVars, adaptiveRules, colorsTheme]
 *     },
 *     {
 *       name: 'dark-merge',
 *       filenames: [darkVars, darkRules, colorsTheme]
 *     },
 *     {
 *       name: 'light-merge',
 *       filenames: [lightVars, lightRules, colorsTheme]
 *     }
 *   ]
 * }
 * @example watchDir(themeWatch.folderPath, themeWatch.folder, themeWatch.themes, sublimeFile)
 */
export function watchDir (stFolder, folderName, stFilenames, fn) {
  // Initialize watcher.
  const watcher = chokidar.watch([
    stFolder
  ], {
    persistent: true,
    cwd: stFolder,
    awaitWriteFinish: true
  })

  // Add event listeners.
  watcher
    .on('add', path => console.log('File ' + color(path, 'cyan') + ' has been added'))

    // Rebuild sublime files when source files change.
    // Option awaitWriteFinish enabled: if file is big, saving file that are being build
    // will rebuild after finish.
    .on('change', (path) => {
      Object.entries(stFilenames).forEach(([k, v]) => {
        if (arrayInclude(v.filenames, path)) {
          // Object key name
          fn(v.name)
        }
      })
      console.log('File ' + color(path, 'yellow') + ' has been changed')
    })

    .on('error', error => console.log('Watcher error: ' + color(error, 'red')))
    .on('raw', (event, path, details) => { // internal
      console.log('Raw event info:', event, path, details)
    })
    .on('ready', () => {
      console.log(color(messageReady(folderName), 'purple'))
    })
}
