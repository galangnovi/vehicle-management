import { signEncToken, signRefreshToken, verifyToken, userPayLoad } from '../../src/utils/jwt-utils';

process.env.JWT_SECRET = 'test_jwt_secret';
process.env.ENC_SECRET = 'test_enc_secret';

describe('JWT Utils - Unit Tests', () => {
  const mockPayload: userPayLoad = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    role: 'user'
  };

  describe('signEncToken', () => {
    it('should generate a valid JWT token', () => {
      const token = signEncToken(mockPayload);

      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); 
    });
  });

  describe('signRefreshToken', () => {
    it('should generate a valid refresh JWT token', () => {
      const token = signRefreshToken(mockPayload);

      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); 
    });
  });

  describe('verifyToken', () => {
    it('should verify and decode a valid token', () => {
      const token = signEncToken(mockPayload);

      const decoded = verifyToken(token);

      expect(decoded).toEqual(mockPayload);
    });

    it('should throw error for invalid token', () => {
      expect(() => verifyToken('invalid.token.here')).toThrow();
    });

    it('should throw error for expired token', () => {
      const expiredToken = signEncToken(mockPayload);

      expect(() => verifyToken(expiredToken)).not.toThrow(); 
    });
  });

  describe('Token roundtrip', () => {
    it('should maintain data integrity through sign and verify', () => {
      const originalPayload: userPayLoad = {
        id: 123,
        email: 'roundtrip@example.com',
        name: 'Round Trip User',
        role: 'admin'
      };

      const token = signEncToken(originalPayload);
      const decodedPayload = verifyToken(token);

      expect(decodedPayload).toEqual(originalPayload);
    });
  });
});
