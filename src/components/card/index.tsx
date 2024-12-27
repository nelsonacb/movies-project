import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useFavoritesStore } from "@/context/useFavoritesStore";
import { useLocation } from "react-router-dom";
import { IconButton, Snackbar, Alert } from "@mui/material";
import { CardProps } from "@/interfaces";
import Skeleton from "@mui/material/Skeleton";

export const MovieCard: React.FC<CardProps> = ({
  id,
  title,
  date,
  alt,
  image_url,
  description,
  rating,
}) => {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(id);
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleToggleFavorite = () => {
    toggleFavorite(id); // Cambia el estado del favorito

    // Mostrar mensaje en el Snackbar
    setSnackbarMessage(
      `${title} ha sido ${isFavorite ? "retirada" : "añadida"} a favoritos`
    );
    setSnackbarOpen(true);

    // Si estamos en la página /favorite-movies o /favorite-series y se desmarca, redirige o actualiza el estado
    if (
      (location.pathname === "/favorite-movies" ||
        location.pathname === "/favorite-series") &&
      isFavorite
    ) {
      // Implementa lógica si es necesario
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardHeader title={title} subheader={date} />
        <CardActionArea sx={{ flexGrow: 1 }}>
          <CardMedia
            component="img"
            height="200"
            width="400"
            loading="lazy"
            image={image_url}
            alt={alt}
            sx={{ objectFit: "cover", objectPosition: "center" }}
            onLoad={() => setLoading(false)}
          />
          {loading && (
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ bgcolor: "grey.300" }}
            />
          )}
        </CardActionArea>
        <CardContent sx={{ flexGrow: 1 }}>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              Rating:
            </Typography>
            {rating}
          </Container>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
