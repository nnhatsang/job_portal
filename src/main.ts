import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Job Portal')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);

  const configService = app.get(ConfigService);

  //  const refreshTokenSecret = configService.get<string>(
  //    'JWT_REFRESH_TOKEN_SECRET',
  //  );
  //  console.log('Refresh Token Secret:', refreshTokenSecret);
  // await app.listen(3000).then(() => {
  //   logger.verbose(`App is running on http://localhost:3000`);
  // });
}
bootstrap();
