import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import RedisStore from "connect-redis"
import {createClient} from "redis"
import { seedAdmin } from './seed';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // تنظیمات استاتیک و ویو
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');



// Initialize client.
let redisClient = createClient()
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
  ttl:3600,
})

  app.use(
    session({
      store: redisStore,
      secret: 'your-secret-key',
      name:'hosein',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // زمان اعتبار کوکی
    }),
  );

  // استفاده از cookie-parser و flash
  app.use(cookieParser());
  app.use(flash());

  // پیکربندی passport
  app.use(passport.initialize());
  app.use(passport.session());

  seedAdmin();

  await app.listen(3000);

}

bootstrap();
