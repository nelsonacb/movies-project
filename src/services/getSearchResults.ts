import axios from "axios";
import { apiKEY, apiURL } from "@/utils/keys";
import { Root } from "@/interfaces";

export const getSearchResults = async ({
  query = "",
  pageParam = 1,
}: {
  query: string;
  pageParam?: number;
}): Promise<Root> => {
  try {
    const response = await axios.get(
      `${apiURL}/search/multi?api_key=${apiKEY}&query=${query}&page=${pageParam}`
    );

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};
