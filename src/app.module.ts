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
import { ApiService } from './api/api.service';
import { ApiModule } from './api/api.module';
import { ApiAuthMiddleware } from './middleware/api.auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'v2ray',
      entities: [UserEntity, V2rayConfigEntity],
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
        { path: '/', method: RequestMethod.ALL },
        { path: 'servers', method: RequestMethod.ALL },
        { path: 'user/add', method: RequestMethod.ALL },
        { path: 'user/edit/:phoneNumber', method: RequestMethod.ALL }
      );

    consumer
      .apply(ApiAuthMiddleware)
      .forRoutes(
        // these are all route that needs to use middleware
        { path: 'api/servers', method: RequestMethod.ALL }
      );

  }

}