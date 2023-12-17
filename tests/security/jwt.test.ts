import {
  verifyJwtToken,
  generateJwtSecret,
  signJwtToken,
} from '../../src/security/jwt';

describe('verifyJwtToken', () => {
  it('should return decoded data when token is valid', () => {
    const expectedData = {
      deviceId: 'testDeviceId',
      userId: 'testUserId',
      username: 'testName',
      roles: ['admin'],
    };
    const token = signJwtToken(expectedData);
    const decoded = verifyJwtToken(token);
    expect(decoded?.deviceId).toEqual(expectedData.deviceId);
  });

  it('should return null when token is invalid', () => {
    const token = 'invalid_token';
    const decoded = verifyJwtToken(token);
    expect(decoded).toBeNull();
  });
});

describe('generateJwtSecret', () => {
  it('should generate a random secret key', () => {
    const secret = generateJwtSecret();
    expect(secret).toBeDefined();
    expect(secret.length).toBe(64);
  });
});

describe('signJwtToken', () => {
  it('should return a valid JWT token', () => {
    const data = {
      deviceId: 'testDeviceId',
      userId: 'testUserId',
      username: 'testName',
      roles: ['admin'],
    };
    const token = signJwtToken(data);
    console.log(token);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});
