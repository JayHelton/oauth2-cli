import { Config } from '../../index.ts';

export default function clientCredentialsFlow({
  token_uri,
  client_id,
  client_secret,
  grant_type,
  audience,
}: Config): Promise<Response> {
  if (!token_uri) {
    throw new Error('Token URI Expected.');
  }
  return fetch(token_uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      grant_type,
      audience,
    }),
  })
}
