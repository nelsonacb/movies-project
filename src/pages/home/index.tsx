import { ShowCards } from "@/components/card/showCards";
import { InputSearch } from "@/components/search";

export const HomePage = () => {
  return (
    <>
      {" "}
      <InputSearch placeholder="Search movies or series" />
      <h2 style={{ marginTop: 80 }}>Home - Trends and Most Recent</h2>
      <ShowCards type="all" />
    </>
  );
};
