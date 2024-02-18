## sublime-builder

Why?  
- Clean comments in final file but keep them on sources
- Show all settings for user when customize theme/color-scheme, this does not happen when using hidden theme files

## builder

Sublime theme and color-scheme builder.

It can merge files or replace variables.
```
@example {Object} adaptiveData = {
  name: 'adaptive',
  filename: adaptiveTheme,
  title: 'Treble Adaptive.sublime-theme - Treble Adaptive',
  author: 'Seven Eda',
  license: 'MIT license',
  rules: pathFile(adaptiveRules, themeDir),
  mergeFiles: [
    pathFile(colorsTheme, themeDir),
    pathFile(adaptiveVars, themeDir),
    pathFile(adaptiveRules, themeDir)
  ],
  replaceFiles: [
    pathFile(adaptiveVars, themeDir),
    pathFile(colorsTheme, themeDir)
  ],
  tabSpaces: 4
}

@example theme,
builder(
  'merge',
  adaptiveData.mergeFiles,
  adaptiveData.title,
  adaptiveData.author,
  adaptiveData.license,
  adaptiveData.filename,
  null,
  null,
  adaptiveData.tabSpaces
)
@example theme,
builder(
  'replace',
  adaptiveData.replaceFiles,
  adaptiveData.title,
  adaptiveData.author,
  adaptiveData.license,
  adaptiveData.filename,
  null,
  adaptiveData.rules,
  adaptiveData.tabSpaces
)
```

## watchDir - build sublime files when changed

Build big theme files is slow when using replace method. Merge method is fast.
```
@example {Object} themeWatch,
{
  folderPath: themePath,
  folder: 'theme',
  themes: [
    {
      name: 'adaptive-merge',
      filenames: [adaptiveVars, adaptiveRules, colorsTheme]
    },
    {
      name: 'dark-merge',
      filenames: [darkVars, darkRules, colorsTheme]
    },
    {
      name: 'light-merge',
      filenames: [lightVars, lightRules, colorsTheme]
    }
  ]
}
@example watchDir(themeWatch.folderPath, themeWatch.folder, themeWatch.themes, sublimeFile)
```

## License

MIT license ([LICENSE-MIT](LICENSE))
