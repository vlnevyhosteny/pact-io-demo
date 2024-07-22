import axios, { AxiosInstance } from "axios";
import { getClient } from "./client";

export interface ConsumerCat {
  name: string;
  breed: string;
}

const CATS_BASE_URL = "http://localhost:3000";

export async function getCats(client: AxiosInstance = getClient({ baseUrl: CATS_BASE_URL })): Promise<ConsumerCat[]> {
  const response = await client.get<ConsumerCat[]>('/cats');

  return response.data;
}
