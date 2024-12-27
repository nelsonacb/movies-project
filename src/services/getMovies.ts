import axios from "axios";
import { apiKEY, apiURL } from "@/utils/keys";
import { Root } from "@/interfaces";

export const getCards = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<Root> => {
  try {
    const response = await axios.get(
      `${apiURL}/trending/all/day?api_key=${apiKEY}&page=${pageParam}`
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
