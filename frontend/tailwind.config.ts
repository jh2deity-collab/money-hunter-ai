import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/landing/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0056b3",
                success: "#28a745",
                // Banking Theme Colors
                banking: {
                    navy: "#363b4e", // KB Deep Navy alike
                    dark: "#1e293b",
                    gold: "#ffbc00", // KB Gold alike
                    goldHover: "#e6a900",
                    gray: "#f3f4f6",
                    text: "#1f2937",
                }
            },
            fontFamily: {
                sans: ["var(--font-noto-sans-kr)", "var(--font-noto-sans)", '"Noto Sans KR"', '"Noto Sans"', "sans-serif"],
                montserrat: ["var(--font-montserrat)", "sans-serif"],
            }
        },
    },
    plugins: [],
};
export default config;
