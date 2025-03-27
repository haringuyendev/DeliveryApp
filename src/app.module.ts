import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load biến môi trường
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');
        if (!mongoUri) {
          throw new Error('MONGODB_URI không được định nghĩa!');
        }
        Logger.log(`Kết nối MongoDB: ${mongoUri}`, 'MongooseModule');
        return { uri: mongoUri };
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers:[AppController],
  providers:[
    AppService,
    {
      provide:APP_GUARD,
      useClass:JwtAuthGuard
    }
  ]
})
export class AppModule {}
