import axios from "axios";

interface Cat {
  name: string;
  breed: string;
}

async function getCats(catsUrl: string = 'http://localhost:3000/cats'): Promise<Cat[]> {
  const response = await axios.get<Cat[]>(catsUrl);

  return response.data;
}

getCats().then((cats) => {
  console.log(cats);
}); 