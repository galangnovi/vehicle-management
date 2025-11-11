import { loginUser } from '../../src/services/auth';
import bcrypt from 'bcrypt';
import { prisma } from '../../src/prisma/prisma';
import { signEncToken, signRefreshToken } from '../../src/utils/jwt-utils';

jest.mock('bcrypt');
jest.mock('../../src/prisma/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
  },
}));
jest.mock('../../src/utils/jwt-utils');

describe('Auth Service - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should login user successfully with correct credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
        role: 'user'
      };

      const mockPayload = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user'
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (signEncToken as jest.Mock).mockReturnValue('access_token');
      (signRefreshToken as jest.Mock).mockReturnValue('refresh_token');

      const result = await loginUser('test@example.com', 'password123');

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
      expect(signEncToken).toHaveBeenCalledWith(mockPayload);
      expect(signRefreshToken).toHaveBeenCalledWith(mockPayload);
      expect(result).toEqual({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
        user: mockPayload
      });
    });

    it('should throw error when user not found', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(loginUser('nonexistent@example.com', 'password123')).rejects.toThrow('Username Salah atau User Tidak Ditemukan');
    });

    it('should throw error when password is incorrect', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
        role: 'user'
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(loginUser('test@example.com', 'wrongpassword')).rejects.toThrow('Password Salah');
    });

    it('should throw error when database operation fails', async () => {
      (prisma.user.findFirst as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(loginUser('test@example.com', 'password123')).rejects.toThrow('Database error');
    });
  });
});
