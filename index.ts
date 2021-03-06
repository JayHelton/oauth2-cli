import Denomander from 'https://deno.land/x/denomander/mod.ts';
import { parse } from 'https://deno.land/std@0.89.0/encoding/yaml.ts';
import * as log from 'https://deno.land/std@0.89.0/log/mod.ts';

import buildAuthCommand from './commands/auth.ts';

export interface Config {
  client_id?: string;
  client_secret?: string;
  grant_type?: string;
  response_type?: string;
  scope?: string[];
  redirect_uri?: string;
  token_uri?: string;
  auth_uri?: string;
  audience?: string;
}

async function main() {
  const program: Denomander = new Denomander({
    app_name: 'OAuth2 CLI',
    app_description: '',
    app_version: '0.1',
  });

  let data: Config;
  try {
    data = parse(await Deno.readTextFile('./config.yaml')) as Config;
  } catch (e) {
    data = {};
    log.warning('No defaults have been configured.');
  }

  program
    .command('auth', 'Start the Authorization Ceremony')
    .option('-grant_type --grant_type', 'Grant Type', undefined, data.grant_type)
    .option('-client_id --client_id', 'Client ID', undefined, data.client_id)
    .option('-redirect_uri --redirect_uri', 'Redirect URI', undefined, data.redirect_uri)
    .option('-scope --scope', 'Scope', undefined, data.scope)
    .option('-response_type --response_type', 'Response Type', undefined, data.response_type)
    .option('-client_secret --client_secret', 'Client Secret', undefined, data.client_secret)
    .option('-token_uri --token_uri', 'OAuth Token URI', undefined, data.token_uri)
    .option('-auth_uri --auth_uri', 'Authroization Server URI', undefined, data.auth_uri)
    .option('-audience --audience', 'audience', undefined, data.audience)
    .action(buildAuthCommand(program));

  program.parse(Deno.args);
}

main();
