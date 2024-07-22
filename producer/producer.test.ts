import { Verifier } from "@pact-foundation/pact";
import { stateHandlers } from "./state-handlers";
import { app as server, VERSION } from "./producer";
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
