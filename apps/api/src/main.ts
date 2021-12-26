/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
		{ cors: true }
	);
  const globalPrefix = 'api';
  const reflector = app.get(Reflector);

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(
		// new HttpResponseInterceptor(), // REMOVED FOR NOW
		new ClassSerializerInterceptor(reflector),
		// new TransformInterceptor()
	);
	app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
