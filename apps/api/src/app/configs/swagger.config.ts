import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, port: number, prefix: string): string {
	const version = '0.0';
	const options = new DocumentBuilder()
    .setTitle('Portfolio Api')
    .setDescription('Restfull API Backend for Portfolio')
		.setVersion(version)
    .addTag('BackEnd, API')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup(prefix + '/documentation', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});

	return `Documentation: http://localhost:${port}/${prefix}/documentation`;
}
