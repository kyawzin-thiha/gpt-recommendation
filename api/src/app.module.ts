import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: process.env.NODE_ENV === 'production' ? '/etc/secrets/.env' : '.env'
    })]
})
export class AppModule {}
