import { AxiosInstance } from 'axios';
import { messagePactWith, pactWith } from 'jest-pact';
import { getClient } from './client';
import { Matchers, synchronousBodyHandler } from '@pact-foundation/pact';
import { ConsumerCat, getCats, processCatEvent } from './consumer';
import { AnyJson } from '@pact-foundation/pact/src/common/jsonTypes';

const cat: ConsumerCat = {
  name: 'Frank',
  breed: 'British Shorthair',
};

pactWith({ consumer: 'CatConsumer', provider: 'CatProvider' }, (provider) => {
  let client: AxiosInstance;

  beforeEach(() => {
    client = getClient({ baseUrl: provider.mockService.baseUrl });
  });

  describe('getCats', () => {
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

messagePactWith({ consumer: 'CatMessageConsumer', provider: 'CatMessageProvider' }, (provider) => {
  function handlerWrapper(message: Parameters<Parameters<typeof synchronousBodyHandler>[0]>[0]) {
    processCatEvent(message as Record<string, any>);
  }

  describe('processCatEvent', () => {
    it('returns a cat', async () => {
       await expect(
        provider
          .given('there is a cat event')
          .expectsToReceive('a cat event')
          .withContent({
            name: Matchers.like(cat.name),
            breed: Matchers.like(cat.breed),
          })
          .withMetadata({
            'content-type': 'application/json',
          })
          .verify(synchronousBodyHandler(handlerWrapper))
       ).resolves.not.toThrow();
    });
  });
}); 