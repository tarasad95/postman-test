import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as Converter from 'openapi-to-postmanv2';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('REST API documentation')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API key for authentication',
      },
      'api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('src/postman/collections/swagger.json', JSON.stringify(document, null, 2));

  // Convert OpenAPI to Postman Collection
  Converter.convert(
    { type: 'json', data: document },
    {},
    (err: any, result: any) => {
      if (!err && result.result) {
        fs.writeFileSync(
          'src/postman/collections/postman-collection.json',
          JSON.stringify(result.output[0].data, null, 2),
        );
        console.log('Postman collection saved to: src/postman/collections/postman-collection.json');
      }
    },
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
