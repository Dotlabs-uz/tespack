module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}",],
    theme: {
        extend: {
            fontFamily: {
                gt: ["GTWalsheimPro-Regular", "sans-serif"],
                "gt-medium": ["GTWalsheimPro-Medium", "sans-serif"],
                "gt-bold": ["GTWalsheimPro-Bold", "sans-serif"],
            },
        },
    },
    plugins: [],
}
