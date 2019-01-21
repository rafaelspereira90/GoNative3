import Color from "color";

export default {
    white: "#fff",
    lighter: "#eee",
    light: "#ddd",
    regular: "#999",
    dark: "#666",
    darker: "#333",
    black: "#000",

    primary: "#c8102e",
    primaryDark: Color("#c8102e").darken(0.1),
    secundary: "#ffff00",
    success: "#9dca66",
    danger: "#e37a7a",

    transparent: "transparent",
    darkTransparent: "rgba(0, 0, 0, 0.6)",
    whiteTransparent: "rgba(255, 255, 255, 0.3)"
};
