import axios from "axios";
export const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};
