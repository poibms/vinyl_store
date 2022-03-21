import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Vinyl Store')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .addOAuth2()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.enableCors();

  await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}
bootstrap();
