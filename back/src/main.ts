import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("API Hotel Royale")
    .setDescription("Proyecto Final")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build()
    
  
  const document = SwaggerModule.createDocument(app,options)
  SwaggerModule.setup("API", app, document)


  await app.listen(3000);
}
bootstrap();