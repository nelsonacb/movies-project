import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface FavoritesState {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

type FavoritesPersist = (
  config: (set: any, get: any, api: any) => FavoritesState,
  options: PersistOptions<FavoritesState>
) => (set: any, get: any, api: any) => FavoritesState;

export const useFavoritesStore = create<FavoritesState>(
  (persist as FavoritesPersist)(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state: any) => {
          if (state.favorites.includes(id)) {
            return {
              favorites: state.favorites.filter(
                (favId: number) => favId !== id
              ),
            };
          } else {
            return { favorites: [...state.favorites, id] };
          }
        }),
    }),
    {
      name: "favorites-storage",
    }
  )
);
