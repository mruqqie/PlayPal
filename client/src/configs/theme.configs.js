import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
    dark: "dark",
    light: "light"
};

const themeConfigs = {
    custom: ({ mode }) => {
        const customPalette = mode ===themeModes.dark
    }
}