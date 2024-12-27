import { Drawer, List, ListItemText, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieIcon from "@mui/icons-material/Movie";
import TheatersIcon from "@mui/icons-material/Theaters";
import { SwitchDarkMode } from "@/components/switch-dark-mode";
import { useThemeStore } from "@/context/useTheme";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();

  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Movies", path: "/movies", icon: <MovieIcon /> },
    {
      text: "Favorite Movies",
      path: "/favorite-movies",
      icon: <FavoriteIcon />,
    },
    { text: "Series", path: "/series", icon: <TheatersIcon /> },
    {
      text: "Favorite Series",
      path: "/favorite-series",
      icon: <FavoriteIcon />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List
        style={{
          color: "white",
          backgroundColor: isDarkMode ? "#003892" : "#0288D1",
          height: "100vh",
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <span style={{ marginRight: 8 }}>{item.icon}</span>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        <SwitchDarkMode />
      </List>
    </Drawer>
  );
};
