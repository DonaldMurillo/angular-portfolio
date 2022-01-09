/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { setupSwagger } from './app/configs/swagger.config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
		{ cors: true }
	);
	const globalPrefix = 'api';
	const reflector = app.get(Reflector);
	const port = process.env.PORT || 3333;


	app.setGlobalPrefix(globalPrefix);
	app.useGlobalInterceptors(
		// new HttpResponseInterceptor(), // REMOVED FOR NOW
		new ClassSerializerInterceptor(reflector),
		// new TransformInterceptor()
	);
	app.useGlobalPipes(new ValidationPipe());

	const swagger = setupSwagger(app, Number(port), globalPrefix); // THIS LINE HAS TO BE AFTER THE GLOBAL PREFIX

	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
	);
	Logger.log(swagger);
}

bootstrap();
