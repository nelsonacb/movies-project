import { Sidebar } from "@/components/sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  MoviePage,
  SeriesPage,
  FavoriteMoviesPage,
  FavoriteSeriesPage,
  NotFoundPage,
} from "@/pages";

export const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: 20 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorite-movies" element={<FavoriteMoviesPage />} />
            <Route path="/favorite-series" element={<FavoriteSeriesPage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
