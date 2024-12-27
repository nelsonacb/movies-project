export interface Root {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  media_type: string;
  popularity: number;
  poster_path: string;
  release_date: string | undefined;
  first_air_date: string | undefined;
  title: string | undefined;
  name: string | undefined;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CardProps {
  id: number;
  title?: string;
  date?: string;
  alt?: string;
  image_url: string;
  description: string;
  rating?: JSX.Element;
}

export interface ShowCardsProps {
  type: "movies" | "series" | "all";
}

export interface InputSearchProps {
  placeholder: string;
}
