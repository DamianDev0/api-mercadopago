import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1')
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true, 
    forbidNonWhitelisted: true,
  }));

  app.enableCors(); 

  const config = new DocumentBuilder()
  .setTitle('Api-mercadopago')
  .setDescription('Api-mercadopago')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

app.useGlobalFilters(new HttpExceptionFilter());


  await app.listen(process.env.PORT || 3000);
}
bootstrap();