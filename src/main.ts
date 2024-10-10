import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { setupWebSocket } from './gateway/websocket.adapter';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Verisoning  added-----------------------------------
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //===================================================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //======================================================
  app.enableCors({
    // origin: process.env.FRONTEND_URL,
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // /===============================================
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('GiftHarbor')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('events')
    .addTag('groups')
    .addTag('gifts')
    .addTag('registries')
    .addTag('auth')
    .addTag('users')
    .addTag('Mail')
    .build();


   // Setup WebSocket Adapter
   setupWebSocket(app);

  console.log(process.env.DATABASE_URL)
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(`${process.env.PORT}`);
  return app.getHttpServer();
}
export default bootstrap();
