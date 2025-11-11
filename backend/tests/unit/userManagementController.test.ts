import { Request, Response } from 'express';
import {
  handlerCreateDataUser,
  handlerGetAllDataUser
} from '../../src/controllers/userManagement';
import { CreateNewUser, SeeAllUser } from '../../src/services/userManagement';
import { AuthRequest } from '../../src/middlewares/auth';

jest.mock('../../src/services/userManagement');

describe('User Management Controller - Unit Tests', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: any;
  let jsonSpy: jest.SpyInstance;
  let statusSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = {};
    jsonSpy = jest.fn();
    statusSpy = jest.fn().mockReturnValue({ json: jsonSpy });
    mockResponse = {
      status: statusSpy,
      json: jsonSpy
    };
    jest.clearAllMocks();
  });

  describe('handlerCreateDataUser', () => {
    it('should create user successfully and return 200', async () => {
      const mockUser = {
        id: 1,
        email: 'newuser@example.com',
        password: 'hashedpassword',
        name: 'New User'
      };

      mockRequest.body = {
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User'
      };

      (CreateNewUser as jest.Mock).mockResolvedValue(mockUser);

      await handlerCreateDataUser(mockRequest as Request, mockResponse as Response);

      expect(CreateNewUser).toHaveBeenCalledWith('newuser@example.com', 'password123', 'New User');
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith({
        code: 200,
        status: 'Success',
        message: 'Sukses Mendaftarkan User Baru',
        data: mockUser
      });
    });

    it('should return 500 when service throws error', async () => {
      mockRequest.body = {
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User'
      };

      (CreateNewUser as jest.Mock).mockRejectedValue(new Error('Validation error'));

      await handlerCreateDataUser(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        code: 500,
        status: 'error',
        message: 'Validation error'
      });
    });

    it('should return default error message when service throws error without message', async () => {
      mockRequest.body = {
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User'
      };

      (CreateNewUser as jest.Mock).mockRejectedValue(new Error());

      await handlerCreateDataUser(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        code: 500,
        status: 'error',
        message: 'Gagal Mendaftarkan User Baru'
      });
    });
  });

  describe('handlerGetAllDataUser', () => {
    it('should get all users successfully and return 200', async () => {
      const mockUsers = [
        {
          id: 2,
          name: 'User Two',
          email: 'user2@example.com',
          vehicle: { name: 'Truck A' }
        }
      ];

      mockRequest = {
        user: { id: 1, email: 'test@example.com', name: 'Test User', role: 'user' }
      };

      (SeeAllUser as jest.Mock).mockResolvedValue(mockUsers);

      await handlerGetAllDataUser(mockRequest as Request, mockResponse as Response);

      expect(SeeAllUser).toHaveBeenCalledWith(1);
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith({
        code: 200,
        status: 'Success',
        message: 'Data User Ditemukan',
        data: mockUsers
      });
    });

    it('should return 500 when service throws error', async () => {
      mockRequest = {
        user: { id: 1, email: 'test@example.com', name: 'Test User', role: 'user' }
      };

      (SeeAllUser as jest.Mock).mockRejectedValue(new Error('Database error'));

      await handlerGetAllDataUser(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        code: 500,
        status: 'error',
        message: 'Database error'
      });
    });

    it('should return default error message when service throws error without message', async () => {
      mockRequest = {
        user: { id: 1, email: 'test@example.com', name: 'Test User', role: 'user' }
      };

      (SeeAllUser as jest.Mock).mockRejectedValue(new Error());

      await handlerGetAllDataUser(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        code: 500,
        status: 'error',
        message: 'Gagal Memuat Data User'
      });
    });
  });
});
