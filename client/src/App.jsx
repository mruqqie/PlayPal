import { ThemeProvider } from "@mui/material/styles";
import themeConfigs, { themeModes } from "./configs/theme.configs";
import {useSelector} from "react-redux"

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode)
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode})}>
      
    </ThemeProvider>
  );
}

export default App;
