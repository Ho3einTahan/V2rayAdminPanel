
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './not-found.filter';
import session from 'express-session';
import flash from 'connect-flash';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './entities/session.entity';
import cookieParser from 'cookie-parser';


async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalFilters(new NotFoundExceptionFilter());

  const dataSource = app.get(DataSource);
  const repository = dataSource.getRepository(SessionEntity);

  app.use(session({
    store: new TypeormStore({
      // cleanupLimit: 2,
      ttl: 86400,
    }).connect(repository),
    secret: 'this is a secret key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 },
  }));

  app.use(cookieParser());
  app.use(flash());

  await app.listen(3000);

}

bootstrap();