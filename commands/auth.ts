import Denomander from 'https://deno.land/x/denomander/mod.ts';
import * as log from 'https://deno.land/std@0.89.0/log/mod.ts';
import authorizationCodeFlow from '../lib/oauth2/authorization-code.ts'
import { Config } from '../index.ts';
import clientCredentialsFlow from '../lib/oauth2/client-credentials.ts';

export default function buildAuthCommand(program: Denomander): () => void {
  return async function (): Promise<void> {
    let response: Response;
    const { grant_type } = program;
    switch (grant_type) {
      case 'authorization_code':
        throw new Error('Not Implemeneted.')
      case 'client_credentials':
        response = await clientCredentialsFlow(program as Config);
        break;
      case 'password':
        throw new Error('Not Implemeneted.')
      case 'refresh_token':
        throw new Error('Not Implemeneted.')
      case 'urn:ietf:params:oauth:grant-type:device_code':
        throw new Error('Not Implemeneted.')
      default:
        throw new Error(`Grant Type ${grant_type} no supported.`)
    }
    log.info(await response.json());
  }
}
