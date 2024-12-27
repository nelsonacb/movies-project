import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCards } from "@/services/getMovies";
import { getSearchResults } from "@/services/getSearchResults";
import { useSearchStore } from "@/context/useSearchStore";
import { useFavoritesStore } from "@/context/useFavoritesStore";
import { MovieCard } from "@/components/card";
import Grid from "@mui/material/Grid2";
import { Alert, Rating } from "@mui/material";
import { Loader } from "@/components/loader";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import { imageURL } from "@/utils/keys";
import { Result, Root, ShowCardsProps } from "@/interfaces";

export const ShowCards: React.FC<ShowCardsProps> = ({ type }) => {
  const { ref, inView } = useInView();
  const { searchTerm } = useSearchStore();
  const { favorites } = useFavoritesStore();
  const location = useLocation();

  // * Consulta para obtener tarjetas generales
  const {
    data: generalData,
    error: generalError,
    fetchNextPage: fetchGeneralNextPage,
    hasNextPage: hasGeneralNextPage,
    isFetchingNextPage: isFetchingGeneralNextPage,
    isPending: isGeneralPending,
  } = useInfiniteQuery<Root, Error>({
    queryKey: ["cards"],
    queryFn: getCards,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;
    },
    enabled: !searchTerm, // * Solo ejecutar si no hay término de búsqueda
  });

  // * Consulta para buscar resultados
  const {
    data: searchResults,
    error: searchError,
    fetchNextPage: fetchSearchNextPage,
    hasNextPage: hasSearchNextPage,
    isFetchingNextPage: isFetchingSearchNextPage,
    isLoading: isSearching,
  } = useInfiniteQuery<Root, Error>({
    queryKey: ["searchResults", searchTerm],
    queryFn: () => getSearchResults({ query: searchTerm }),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;
    },
    enabled: !!searchTerm, // * Solo ejecutar si hay un término de búsqueda
    keepPreviousData: true,
  });

  useEffect(() => {
    if (inView && (hasGeneralNextPage || hasSearchNextPage)) {
      if (searchTerm) {
        fetchSearchNextPage();
      } else {
        fetchGeneralNextPage();
      }
    }
  }, [
    inView,
    fetchGeneralNextPage,
    hasGeneralNextPage,
    fetchSearchNextPage,
    hasSearchNextPage,
    searchTerm,
  ]);

  if (isGeneralPending || isSearching) {
    return <Loader />;
  }

  if (generalError) {
    return (
      <Alert severity="error">
        Error fetching cards: {generalError.message}
      </Alert>
    );
  }

  if (searchError) {
    return (
      <Alert severity="error">
        Error fetching search results: {searchError.message}
      </Alert>
    );
  }

  const generalResults: Result[] =
    generalData?.pages.flatMap((page: any) => page.results) || [];

  const filteredGeneralResults = generalResults.filter((card) => {
    if (type === "movies") return card.media_type === "movie";
    if (type === "series") return card.media_type === "tv";
    return true;
  });

  const searchResultsFlattened: Result[] =
    searchResults?.pages.flatMap((page: any) => page.results) || [];

  const filteredSearchResults = searchResultsFlattened.filter((card) => {
    if (type === "movies") return card.media_type === "movie";
    if (type === "series") return card.media_type === "tv";
    return true;
  });

  const displayResults = searchTerm
    ? filteredSearchResults
    : filteredGeneralResults;

  const filteredData = displayResults.filter((card) =>
    location.pathname === "/favorite-movies"
      ? favorites.includes(card.id) && card.media_type === "movie"
      : location.pathname === "/favorite-series"
      ? favorites.includes(card.id) && card.media_type === "tv"
      : true
  );

  return (
    <Grid
      container
      spacing={{ xs: 3, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {filteredData.map((card) => (
        <Grid key={card.id} size={{ xs: 4, sm: 4, md: 4 }}>
          <MovieCard
            key={card.id}
            id={card.id}
            title={card.title || card.name}
            alt={card.title || card.name}
            date={card.release_date || card.first_air_date}
            image_url={`${imageURL}${card.poster_path}`}
            description={card.overview}
            rating={<Rating value={card.vote_average / 2} readOnly />}
          />
        </Grid>
      ))}
      <div ref={ref} />
      {(isFetchingGeneralNextPage || isFetchingSearchNextPage) && <Loader />}
    </Grid>
  );
};
