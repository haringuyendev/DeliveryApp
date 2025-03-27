import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { Public } from './public.decorator';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('register')
  register(@Body() registerDTO: RegisterDto) {
    return this.authService.register(registerDTO);
  }
  
  @Public()
  @Post('login')
  async login(@Body() loginDTO: LoginDto) {
    return this.authService.login(loginDTO);
  }
}
