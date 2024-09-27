import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import *  as dotenv from 'dotenv'
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
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

    
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api', app, document);
  await app.listen(`${process.env.PORT}`);
}
bootstrap();
