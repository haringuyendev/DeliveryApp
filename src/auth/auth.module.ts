import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'secretKey', // Đổi thành biến môi trường trong production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers:[AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
