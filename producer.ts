import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

interface Cat {
  name: string;
  age: number;
  breed: string;
}

const cats: Cat[] = [
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

app.get("/cats", (req: Request, res: Response) => {
  res.json(cats);
  res.status(200);
});

app.listen(port, () => {
  console.log(`[producer]: Server is running at http://localhost:${port}`);
});