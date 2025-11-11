import { SeeAllVehicle, DetailVehicle } from '../../src/services/vehicle';
import { prisma } from '../../src/prisma/prisma';

jest.mock('../../src/prisma/prisma', () => ({
  prisma: {
    vehicle: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('Vehicle Service - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('SeeAllVehicle', () => {
    it('should return paginated vehicles without filters', async () => {
      const mockVehicles = [
        {
          id: 1,
          name: 'Truck A',
          lisensePlate: 'B1001AA',
          type: 'Truck',
          route: 'Route Alpha',
          status: 'running',
          lastPosition: 'Jakarta',
          updatedAt: new Date(),
          user: { name: 'John Doe', email: 'john@example.com' }
        }
      ];

      (prisma.vehicle.findMany as jest.Mock).mockResolvedValue(mockVehicles);
      (prisma.vehicle.count as jest.Mock).mockResolvedValue(1);

      const result = await SeeAllVehicle(1);

      expect(prisma.vehicle.findMany).toHaveBeenCalledWith({
        where: {},
        select: expect.any(Object),
        skip: 0,
        take: 10,
        orderBy: { updatedAt: 'desc' }
      });
      expect(result.data).toEqual(mockVehicles);
      expect(result.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1
      });
    });

    it('should filter vehicles by updatedAt date', async () => {
      const mockVehicles: any[] = [];
      const updatedAt = '2025-11-01';

      (prisma.vehicle.findMany as jest.Mock).mockResolvedValue(mockVehicles);
      (prisma.vehicle.count as jest.Mock).mockResolvedValue(0);

      // Act
      const result = await SeeAllVehicle(1, updatedAt);

      // Assert
      expect(prisma.vehicle.findMany).toHaveBeenCalledWith({
        where: {
          updatedAt: {
            gte: expect.any(Date),
            lte: expect.any(Date)
          }
        },
        select: expect.any(Object),
        skip: 0,
        take: 10,
        orderBy: { updatedAt: 'desc' }
      });
      expect(result.data).toEqual(mockVehicles);
    });

    it('should handle database errors', async () => {
      (prisma.vehicle.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(SeeAllVehicle(1)).rejects.toThrow('Database error');
    });
  });

  describe('DetailVehicle', () => {
    it('should return vehicle details with statuses', async () => {
      const mockVehicle = {
        id: 1,
        name: 'Truck A',
        lisensePlate: 'B1001AA',
        type: 'Truck',
        route: 'Route Alpha',
        status: 'running',
        lastPosition: 'Jakarta',
        updatedAt: new Date(),
        user: { name: 'John Doe', email: 'john@example.com' },
        vehicleStatuses: [
          {
            id: 1,
            status: 'running',
            dateTime: new Date(),
            position: 'Jakarta',
            information: 'Status update',
            updatedAt: new Date()
          }
        ]
      };

      (prisma.vehicle.findUnique as jest.Mock).mockResolvedValue(mockVehicle);

      const result = await DetailVehicle(1);

      expect(prisma.vehicle.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: expect.any(Object)
      });
      expect(result).toEqual(mockVehicle);
    });

    it('should throw error when vehicle not found', async () => {
      (prisma.vehicle.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(DetailVehicle(999)).rejects.toThrow('Data Vehicle Tidak Ditemukan');
    });

    it('should handle database errors', async () => {
      (prisma.vehicle.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(DetailVehicle(1)).rejects.toThrow('Database error');
    });
  });
});
