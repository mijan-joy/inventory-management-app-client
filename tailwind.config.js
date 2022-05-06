module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            padding: "1rem",
        },
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                rakib: {
                    400: "#00df9a",
                },
                greyblack: "#1a1a1a",
                darkblack: "#181818",
                darkbg: "#1f2937",
                darkcard: "#1f2937",
            },
        },
    },
    plugins: [],
};
