import { AxiosInstance } from 'axios';
import { pactWith } from 'jest-pact';
import { getClient } from './client';
import { Matchers } from '@pact-foundation/pact';
import { ConsumerCat, getCats } from './consumer';

pactWith({ consumer: 'CatConsumer', provider: 'CatProvider' }, (provider) => {
  let client: AxiosInstance;

  beforeEach(() => {
    client = getClient({ baseUrl: provider.mockService.baseUrl });
  });

  describe('getCats', () => {
    const cat: ConsumerCat = {
      name: 'Frank',
      breed: 'British Shorthair',
    };

    beforeEach(async () => {
      await provider.addInteraction({
        state: 'there are some cats',
        uponReceiving: 'a request for cats',
        withRequest: {
          method: 'GET',
          path: '/cats',
        },
        willRespondWith: {
          status: 200,
          body: Matchers.eachLike({
            name: Matchers.like(cat.name),
            breed: Matchers.like(cat.breed),
          }),
        },
      });
    });

    it('returns a list of cats', async () => {
      const cats = await getCats(client);

      expect(cats).toEqual(
        expect.arrayContaining([
          expect.objectContaining(cat),
        ]),
      )
    });
  });
});