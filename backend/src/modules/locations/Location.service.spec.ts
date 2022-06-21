import { Category } from './../categories/Category.entity';
import { Location } from './Location.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { LocationService } from './Location.service';
import { CreateLocationDto } from './Location.dto';

describe('Testing location service', () => {
  let locationService: LocationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(Location),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn().mockReturnValue({
              id: 1,
              title: 'Test',
              description: 'Test',
              location: 'Test',
              picture: 'Test',
              price: 1,
              stars: 1,
              numberOfRooms: 1,
              categoryId: 1,
            }),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn().mockReturnValue({
              id: 1,
              name: 'Hotel',
              description: 'Hotel description',
            }),
          },
        },
      ],
    }).compile();

    locationService = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(locationService).toBeDefined();
  });

  describe('createLocation', () => {
    it('should create a new location', async () => {
      const location = new CreateLocationDto();
      location.title = 'Test';
      location.description = 'Test';
      location.location = 'Test';
      location.picture = 'Test';
      location.price = 1;
      location.stars = 1;
      location.numberOfRooms = 1;
      location.categoryName = 'hotel';

      const result = await locationService.createLocation(location);
      expect(result).toMatchObject({
        id: 1,
        title: 'Test',
        description: 'Test',
        location: 'Test',
        picture: 'Test',
        price: 1,
        stars: 1,
        numberOfRooms: 1,
        categoryId: 1,
      });
    });
  });
});
