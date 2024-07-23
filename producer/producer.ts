import express, { Express, Request, Response } from "express";

export const VERSION = "1.0.0";

interface Cat {
  name: string;
  age: number;
  breed: string;
}

export const cats: Cat[] = [
  {
    name: "Frank",
    age: 2,
    breed: "British Shorthair",
  },
  {
    name: "Paws",
    age: 1,
    breed: "Siamese",
  },
];

export const app = express();

app.get("/cats", (req: Request, res: Response) => {
  res.json(cats);
  res.status(200);
});

export function createCatEvent(): Cat {
  return cats[0];
}
