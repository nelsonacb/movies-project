import { ShowCards } from "@/components/card/showCards";
import { InputSearch } from "@/components/search";

export const MoviePage = () => {
  return (
    <>
      {" "}
      <InputSearch placeholder="Search movies" />
      <h2 style={{ marginTop: 80 }}>Movies</h2>
      <ShowCards type="movies" />
    </>
  );
};
