import { MessageProviderPact, providerWithMetadata, Verifier } from "@pact-foundation/pact";
import { stateHandlers } from "./state-handlers";
import { createCatEvent, app as server, VERSION } from "./producer";
import { Server } from "http";

function getVerifier(): Verifier {
  return new Verifier({
    provider: 'CatProvider',
    providerBaseUrl: 'http://localhost:3000',    
    stateHandlers,

    publishVerificationResult: true,
    providerVersion: VERSION,
    providerBranch: 'main',
    consumerVersionSelectors: [
      {
        matchingBranch: true,
      },
      {
        mainBranch: true,
      },
      {
        deployedOrReleased: true,
      },
    ],

    pactBrokerUrl: 'http://localhost:9292',
  });
}

function getMessageVerifier(): MessageProviderPact{
  return new MessageProviderPact({
    provider: 'CatMessageProvider',
    providerVersion: VERSION,
    providerBranch: 'main',
    publishVerificationResult: true,
    consumerVersionSelectors: [
      {
        matchingBranch: true,
      },
      {
        mainBranch: true,
      },
      {
        deployedOrReleased: true,
      },
    ],

    messageProviders: {
      'a cat event': providerWithMetadata(() => createCatEvent(), {
        'content-type': 'application/json',
      }),
    },

    pactBrokerUrl: 'http://localhost:9292',
  });
}

describe('Pact Verification', () => {
  let app: Server;
  const PROVIDER_PORT = 3000;

  beforeEach(async () => {
    app = server.listen(PROVIDER_PORT);
  });

  afterEach(async () => {
    if (app) {
      app.close();
    }
  });

  it('validates pacts', async () => {
    await expect(getVerifier().verifyProvider()).resolves.not.toThrow();
  });
});

describe('Message Pact Verification', () => {
  describe('publishCatEvent', () => {
    it('validates message pacts', async () => {
      await expect(getMessageVerifier().verify()).resolves.not.toThrow();
    });
  });
});
