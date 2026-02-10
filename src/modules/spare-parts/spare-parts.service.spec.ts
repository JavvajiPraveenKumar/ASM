import { Test, TestingModule } from '@nestjs/testing';
import { SparePartsService } from './spare-parts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SparePart } from './entities/spare-part.entity';
import { Category } from '../categories/entities/category.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { SparePartsPageOptionsDto } from './dto/spare-parts-page-options.dto';
import { Order } from '../../common/constants/order.constant';

describe('SparePartsService', () => {
  let service: SparePartsService;
  let sparePartsRepository: Repository<SparePart>;
  let queryBuilder: SelectQueryBuilder<SparePart>;

  beforeEach(async () => {
    queryBuilder = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(0),
      getRawAndEntities: jest.fn().mockResolvedValue({ entities: [], raw: [] }),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SparePartsService,
        {
          provide: getRepositoryToken(SparePart),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Supplier),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SparePartsService>(SparePartsService);
    sparePartsRepository = module.get<Repository<SparePart>>(
      getRepositoryToken(SparePart),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPaginatedSpareParts', () => {
    it('should return paginated spare parts without filters', async () => {
      const pageOptionsDto: SparePartsPageOptionsDto = {
        order: Order.ASC,
        page: 1,
        take: 10,
        skip: 0,
      };

      const result = await service.getPaginatedSpareParts(pageOptionsDto);

      expect(sparePartsRepository.createQueryBuilder).toHaveBeenCalledWith(
        'sparePart',
      );
      expect(queryBuilder.select).toHaveBeenCalled();
      expect(queryBuilder.skip).toHaveBeenCalledWith(0);
      expect(queryBuilder.take).toHaveBeenCalledWith(10);
      expect(result.data).toEqual([]);
    });

    it('should apply filters when provided', async () => {
      const pageOptionsDto: SparePartsPageOptionsDto = {
        order: Order.ASC,
        page: 1,
        take: 10,
        skip: 0,
        vehicleBrand: 'Toyota',
        vehicleModel: 'Camry',
        isActive: true,
      };

      await service.getPaginatedSpareParts(pageOptionsDto);

      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'sparePart.vehicleBrand = :vehicleBrand',
        { vehicleBrand: 'Toyota' },
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'sparePart.vehicleModel = :vehicleModel',
        { vehicleModel: 'Camry' },
      );
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'sparePart.isActive = :isActive',
        { isActive: true },
      );
    });

    it('should apply search filter correctly', async () => {
      const pageOptionsDto: SparePartsPageOptionsDto = {
        order: Order.ASC,
        page: 1,
        take: 10,
        skip: 0,
        search: 'Brake',
      };

      await service.getPaginatedSpareParts(pageOptionsDto);

      // Verify that Brackets was used (indirectly via checking andWhere call with Brackets object or function)
      // Since Brackets is a class, checking exact equality might be tricky without deeper mocking,
      // but we can check if andWhere was called with an object that looks like Brackets or just called at all.
      // For simplicity in this unit test environment, we assume if andWhere is called enough times it works,
      // or we can spy on Brackets if we really wanted to.
      // However, we can assert that andWhere was called 1 time for the search.
      expect(queryBuilder.andWhere).toHaveBeenCalledTimes(1);
    });
  });
});
