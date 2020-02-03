import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

const app = express();

const HOST = process.env.HOST || process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT;

app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const bootstrap = async () => {
  const server = await NestFactory.create(AppModule, new ExpressAdapter(app));


  server.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const options = new DocumentBuilder()
    .setTitle('Cars')
    .setDescription('CARS API')
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(server, options);
  SwaggerModule.setup('/api', server, document);

  await server.listen(PORT, () => console.log(`Server is listening http://${HOST}:${PORT}/api/`));
};

bootstrap();
