import { Verifier } from "@pact-foundation/pact";
import { cats } from "./producer";

export const stateHandlers: Pick<ConstructorParameters<typeof Verifier>[0], 'stateHandlers'>['stateHandlers'] = {
  'there are some cats': () => {
    return Promise.resolve(cats);
  }
};
