import axios from "axios";
import { Root } from "./response";

const baseUrl = "https://next.api.whathebyte.com/posts?limit=20";

export const fetchData = async () => {
  const req = await axios.get<Root>(baseUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return req
};

export const fetchNextPage = async (after: string) => {
  const req = await axios.get<Root>(`${baseUrl}&after=${after}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return req
};

