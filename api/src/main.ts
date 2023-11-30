import type {ConfigService as ConfigServiceType} from '@nestjs/config';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigServiceType>(ConfigService);

    app.enableCors({
        origin: configService.get('CLIENT_URL'),
        credentials: true
    });

    app.use(helmet());
    app.use(cookieParser());
    app.use(compression());

    const PORT = configService.get('PORT') || 3001;

    await app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

bootstrap();
``;
