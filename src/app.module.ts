import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule, generaOriginFn } from './adminModule/module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mixinAdminModule } from './mixinAdminModule';
const { entities, Controllers, Services } = generaOriginFn();
mixinAdminModule({ entities, Controllers, Services });
@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.log(config.get('DATABASE'));
        return {
          type: 'sqlite',
          database: config.get('DATABASE'),
          entities: [...Object.values(entities)],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    AdminModule.forRootAsync({
      controllers: [...Object.values(Controllers)],
      providers: [...Object.values(Services)],
      entities: [...Object.values(entities)],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
