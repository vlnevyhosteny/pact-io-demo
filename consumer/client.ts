import axios, { AxiosInstance } from "axios";

export const getClient = ({ baseUrl }: { baseUrl: string }): AxiosInstance => 
  axios.create({ baseURL: baseUrl });
