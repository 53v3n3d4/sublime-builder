export const themeMerge =
`/**
 * @file Theme Test.sublime-theme - Theme Test Merge or Replace
 * @copyright John Doe
 * @license MIT license
 */
{
    "variables": {
        "black1": "#000000",
        "black2": "#161818",
        "black3": "#323234",
        "black4": "#404040",
        "black5": "#808080",
        "black6": "#252727",
        "black7": "#30302F",
        "black8": "#232323",
        "black9": "#18171B",
        "title-bar-bg": "var(black8)",
        "sidebar-container-bg": "var(black1)",
        "sidebar-container-bg-border": "var(black1)"
    },
    "rules": [
        {
            "class": "title_bar",
            "bg": "var(title-bar-bg)",
            "style": "system",
            "layer0.tint": null,
            "layer0.opacity": 0,
            "layer0.texture": ""
        },
        {
            "class": "sidebar_container",
            "settings": {
                "dark_theme_style": [
                    "mix",
                    "analog",
                    "digital"
                ]
            },
            "content_margin": [
                0,
                8,
                0,
                0
            ],
            "layer0.opacity": {
                "target": 0.8,
                "speed": 4,
                "interpolation": "smoothstep"
            },
            "layer0.tint": "var(sidebar-container-bg)",
            "layer1.draw_center": false,
            "layer1.inner_margin": [
                0,
                1,
                0,
                0
            ],
            "layer1.opacity": 1,
            "layer1.tint": "var(sidebar-container-bg-border)"
        }
    ]
}`
