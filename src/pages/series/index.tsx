import { ShowCards } from "@/components/card/showCards";
import { InputSearch } from "@/components/search";

export const SeriesPage = () => {
  return (
    <>
      {" "}
      <InputSearch placeholder="Search series" />
      <h2 style={{ marginTop: 80 }}>Series</h2>
      <ShowCards type="series" />
    </>
  );
};
