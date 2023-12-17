import { Request, Response, NextFunction } from 'express';
import { authJwt } from '../../src/middleware/index';
import { verifyJwtToken } from '../../src/security/jwt';

jest.mock('../../src/security/jwt', () => ({
  verifyJwtToken: jest.fn(),
}));

describe('authJwt', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided', () => {
    authJwt(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    req.headers = { authorization: 'Bearer invalid_token' };
    (verifyJwtToken as jest.Mock).mockReturnValueOnce(null);

    authJwt(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if token is valid', () => {
    req.headers = { authorization: 'Bearer valid_token' };
    (verifyJwtToken as jest.Mock).mockReturnValueOnce({});

    authJwt(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});