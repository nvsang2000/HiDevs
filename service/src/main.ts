import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import * as dayjs from 'dayjs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    exposedHeaders: ['meta'],
    origin: [],
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // enable shutdown hook
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  //await setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  await app.listen(80);

  console.log(`${dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]')}`);
}
bootstrap();
