import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';

describe('Products (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();

    dataSource = moduleFixture.get(getDataSourceToken());

    await dataSource.runMigrations();
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
    await app.close();
  });

  it('POST /products -> create product', async () => {
    const res = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test product',
        price: 99,
        description: 'Test description',
      })
      .expect(201);

    expect(res.body).toEqual({
      id: expect.any(Number),
      name: 'Test product',
      price: 99,
      description: 'Test description',
    });
  });

  it('GET /products -> retuns products list', async () => {
    const res = await request(app.getHttpServer()).get('/products').expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).not.toHaveProperty('createdAt');
  });

  it('POST /products -> validation error', async () => {
    await request(app.getHttpServer())
      .post('/products')
      .send({
        name: '',
        price: -5,
      })
      .expect(400);
  });
});
