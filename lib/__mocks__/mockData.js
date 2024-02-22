const cleanPath = (dirName) => dirName.pathname.replace(/%20| /g, ' ')
const mockDir = new URL('../__mocks__/', import.meta.url)
const pathFile = (file, dir) => new URL(file, dir)

// Dir/folders Path. Used by Watch.
export const mockPath = cleanPath(mockDir)

// Theme
export const themeColors = 'mockThemeColors.hidden-theme'
export const themeRules = 'mockThemeRules.hidden-theme'
export const themeVars = 'mockThemeVars.hidden-theme'

// Color-schemes
export const globalRules = 'mockGlobalRules.hidden-color-scheme'
export const schemeColors = 'mockSchemeColors.hidden-color-scheme'
export const schemeVars = 'mockSchemeVars.hidden-color-scheme'

// Filenames
export const fileSchemeMerge = pathFile('Scheme Merge Test.sublime-color-scheme', mockDir)
export const fileSchemeReplace = pathFile('Scheme Replace Test.sublime-color-scheme', mockDir)
export const fileThemeMerge = pathFile('Theme Merge Test.sublime-theme', mockDir)
export const fileThemeReplace = pathFile('Theme Replace Test.sublime-theme', mockDir)

// Error
export const errorFile = pathFile('mockErrorFile.hidden-theme', mockDir)

export const schemeData = {
  name: 'scheme',
  title: 'Scheme Test.sublime-color-scheme - Scheme Test Merge or Replace',
  author: 'John Doe',
  license: 'MIT license',
  rules: pathFile(globalRules, mockDir),
  mergeFiles: [
    pathFile(schemeColors, mockDir),
    pathFile(schemeVars, mockDir),
    pathFile(globalRules, mockDir)
  ],
  replaceFiles: [
    pathFile(schemeVars, mockDir),
    pathFile(schemeColors, mockDir)
  ],
  tabSpace: 4
}

export const themeData = {
  name: 'theme',
  title: 'Theme Test.sublime-theme - Theme Test Merge or Replace',
  author: 'John Doe',
  license: 'MIT license',
  rules: pathFile(themeRules, mockDir),
  mergeFiles: [
    pathFile(themeColors, mockDir),
    pathFile(themeVars, mockDir),
    pathFile(themeRules, mockDir)
  ],
  replaceFiles: [
    pathFile(themeVars, mockDir),
    pathFile(themeColors, mockDir)
  ],
  tabSpace: 4
}
