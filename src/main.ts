import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder().setTitle("Job Portal").addBearerAuth({type:"http",scheme:`beaer`, bearerFormat:"Token"},"access-token").build();
const document= SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);


   const configService = app.get(ConfigService);

  //  const refreshTokenSecret = configService.get<string>(
  //    'JWT_REFRESH_TOKEN_SECRET',
  //  );
  //  console.log('Refresh Token Secret:', refreshTokenSecret);
}
bootstrap();
