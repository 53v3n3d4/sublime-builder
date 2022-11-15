export const schemeMerge =
`/**
 * @file Scheme Test.sublime-color-scheme - Scheme Test Merge or Replace
 * @copyright John Doe
 * @license MIT license
 */
{
    "name": "Scheme",
    "variables": {
        "black3": "#323234",
        "black5": "#808080",
        "black9": "#18171B",
        "blue1": "#2077FB",
        "blue5": "#5DD8FF",
        "cyan2": "#38A2AF",
        "cyan3": "#06B1D8",
        "cyan4": "#007F7C",
        "gray2": "#B4B4B4",
        "orange1": "#FD8F3F",
        "purple1": "#8D52D1",
        "red2": "#C41A16",
        "white2": "#F0F0F7",
        "yellow1": "#FFE76D",
        "bg-color": "var(black9)",
        "primary-color": "var(blue5)"
    },
    "globals": {
        "background": "var(bg-color)",
        "foreground": "var(white2)",
        "invisibles": "var(red2)",
        "caret": "var(black5)",
        "block_caret": "var(blue1)",
        "line_highlight": "var(black3)",
        "misspelling": "var(orange1)",
        "fold_marker": "var(yellow1)",
        "minimap_border": "var(yellow1)",
        "accent": "var(cyan2)",
        "gutter": "var(bg-color)",
        "gutter_foreground": "color(var(gray2) alpha(0.7))",
        "line_diff_width": "2"
    },
    "rules": [
        {
            "name": "Entity name",
            "scope": "entity.name",
            "foreground": "var(blue5)"
        },
        {
            "name": "Entity other inherited class",
            "scope": "entity.other.inherited-class",
            "foreground": "var(blue5)"
        },
        {
            "name": "Entity name section",
            "scope": "entity.name.section",
            "foreground": "var(purple1)"
        }
    ]
}`
