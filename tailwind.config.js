const colors = require("tailwindcss/colors");

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                "2xs": "160px",
                xs: "320px",
                "2sm": "480px",
                "3xl": "1680px",
                "4xl": "1920px",
                xln: "1440px",
            },
        },
        colors: {
            transparent: "transparent",
            black: colors.black,
            white: colors.white,
            bluegray: colors.blueGray,
            coolgray: colors.coolGray,
            gray: colors.gray,
            truegray: colors.trueGray,
            warmgray: colors.warmGray,
            red: colors.red,
            orange: colors.orange,
            amber: colors.amber,
            yellow: colors.yellow,
            lime: colors.lime,
            green: colors.green,
            emerald: colors.emerald,
            teal: colors.teal,
            cyan: colors.cyan,
            lightblue: colors.sky,
            blue: colors.blue,
            indigo: colors.indigo,
            violet: colors.violet,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            pink: colors.pink,
            rose: colors.rose,

            primary: colors.lime,
            secondary: colors.trueGray,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
