import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtAuthMiddleware } from './middleware/jwt.auth.middleware';
import { V2rayConfigEntity } from './entities/v2ray.config.entity';
import { ServersModule } from './servers/servers.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/constants';
import { ApiModule } from './api/api.module';
import { ApiAuthMiddleware } from './middleware/api.auth.middleware';
import { ApkModule } from './apk/apk.module';
import { PricingModule } from './pricing/pricing.module';
import { PricingEntity } from './entities/pricing.entity';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',  // استفاده از آخرین تغییرات برای host
      port: 3306,
      username: 'root',
      password: '',
      database: 'v2ray',
      entities: [UserEntity, V2rayConfigEntity, PricingEntity],
      synchronize: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
    AuthModule,
    UserModule,
    ServersModule,
    ApiModule,
    ApkModule,
    PricingModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes(
        // these are all route that needs to use middleware
        { path: 'admin/dashboard', method: RequestMethod.ALL },
        { path: 'servers', method: RequestMethod.ALL },
        { path: 'user/add', method: RequestMethod.ALL },
        { path: 'user/edit/:phoneNumber', method: RequestMethod.ALL },
        { path: 'apk/upload', method: RequestMethod.ALL },
        { path: 'apk/delete/:id', method: RequestMethod.ALL },
        { path: 'pricing', method: RequestMethod.ALL },
        { path: 'pricing/add', method: RequestMethod.ALL },
        { path: 'pricing/edit/:id', method: RequestMethod.ALL },
        { path: 'pricing/delete/:id', method: RequestMethod.ALL },
      );

    consumer
      .apply(ApiAuthMiddleware)
      .forRoutes(
        // these are all route that needs to use middleware
        { path: 'api/servers', method: RequestMethod.ALL }
      );
  }
}
