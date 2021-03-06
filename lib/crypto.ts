import { encode } from 'https://deno.land/std@0.82.0/encoding/base64.ts';
import { createHash } from 'https://deno.land/std@0.89.0/hash/mod.ts';
import { nanoid } from 'https://deno.land/x/nanoid/mod.ts'

function sha256(data: string): string {
  const hash = createHash('sha256');
  hash.update(data);
  return hash.toString('base64');
}
// const verifier = encode(nanoid(16));
// const challenge = sha256(verifier);
// const state = encode(nanoid(16));
