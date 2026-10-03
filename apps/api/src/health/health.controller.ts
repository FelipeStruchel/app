import {Controller, Get, Post} from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok' };
  }

  @Post('healthVer')
  checar(){
    return { status: 'bobor'}
  }
}