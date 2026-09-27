import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  if (process.env.NODE_ENV === 'production' && (!process.env.ADMIN_API_KEY || process.env.ADMIN_API_KEY.length < 32)) {
    throw new Error('ADMIN_API_KEY must contain at least 32 characters in production');
  }
  const app = await NestFactory.create(AppModule);
	app.enableCors({
    credentials: true,
    origin: (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001').split(',').map(value => value.trim()),
  });
  await app.listen(Number(process.env.PORT || 8000), process.env.HOST || '127.0.0.1');
}
bootstrap();
