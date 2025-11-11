import { CreateNewUser, SeeAllUser } from '../../src/services/userManagement';
import bcrypt from 'bcrypt';
import { prisma } from '../../src/prisma/prisma';

jest.mock('bcrypt');
jest.mock('../../src/prisma/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('User Management Service - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CreateNewUser', () => {
    it('should create new user successfully with valid data', async () => {
      const mockUser = {
        id: 1,
        email: 'newuser@example.com',
        password: 'hashedpassword',
        name: 'New User'
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await CreateNewUser('newuser@example.com', 'password123', 'New User');

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'newuser@example.com',
          password: 'hashedpassword',
          name: 'New User'
        }
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw error when email is invalid', async () => {
      await expect(CreateNewUser('invalid-email', 'password123', 'New User')).rejects.toThrow();
    });

    it('should throw error when password is too short', async () => {
      await expect(CreateNewUser('newuser@example.com', '123', 'New User')).rejects.toThrow();
    });

    it('should throw error when name is empty', async () => {
      await expect(CreateNewUser('newuser@example.com', 'password123', '')).rejects.toThrow();
    });

    it('should throw error when database operation fails', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (prisma.user.create as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(CreateNewUser('newuser@example.com', 'password123', 'New User')).rejects.toThrow('Database error');
    });
  });

  describe('SeeAllUser', () => {
    it('should return all users except current user', async () => {
      const mockUsers = [
        {
          id: 2,
          name: 'User Two',
          email: 'user2@example.com',
          vehicle: { name: 'Truck A' }
        },
        {
          id: 3,
          name: 'User Three',
          email: 'user3@example.com',
          vehicle: null
        }
      ];

      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await SeeAllUser(1);

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            not: 1
          }
        },
        select: {
          id: true,
          name: true,
          email: true,
          vehicle: {
            select: {
              name: true
            }
          }
        }
      });
      expect(result).toEqual(mockUsers);
    });

    it('should throw error when no users found', async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue(null);

      await expect(SeeAllUser(1)).rejects.toThrow('Data User Kosong Atau Tidak Ditemukan');
    });

    it('should handle database errors', async () => {
      (prisma.user.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(SeeAllUser(1)).rejects.toThrow('Database error');
    });
  });
});
