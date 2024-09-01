import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpErrorFilter } from './filters/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PF-EclipseRoyale')
    .setDescription(
      'Este es un proyecto para el último módulo de Henry y el hotel EclipseRoyale',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3001',

      'https://front-hotel-app-delta.vercel.app',
      'https://front-hotel-app-six.vercel.app',
      'https://front-hotel-app-tawny.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // PERDON CHAVALES

  app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(3000);
}
bootstrap();
