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

export function processCatEvent(message: Record<string, any> | null): ConsumerCat {
  if (!message) {
    throw new Error('null message');
  }

  if (!message.name || !message.breed) {
    throw new Error('Invalid message');
  }

  return {
    name: message.name,
    breed: message.breed,
  };
}
