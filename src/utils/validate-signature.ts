import { createHmac, timingSafeEqual } from 'crypto';

const s2b = (str: string, encoding: BufferEncoding) =>
  Buffer.from(str, encoding);

const safeCompare = (a: Buffer, b: Buffer) => {
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
};

const validateSignature = (body: string, secret: string, signature: string) =>
  safeCompare(
    createHmac('SHA256', secret).update(body).digest(),
    s2b(signature, 'base64'),
  );

export default validateSignature;
