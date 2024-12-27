import { PublicRoutes } from "@/routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useThemeStore } from "@/context/useTheme";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();

const App = () => {
  const { isDarkMode } = useThemeStore();
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <PublicRoutes />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
