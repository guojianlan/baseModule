import { Controller, Get, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './adminModuleAsync/module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController, UserService, UserEntity } from './adminModuleAsync';
import { Column, Entity } from 'typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get('DATABASE'),
          entities: [UserEntity],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    AdminModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        console.log(config);
        // todo
        @Entity('user')
        class MixinEntity extends UserEntity {
          @Column()
          userName: string;
          @Column()
          phone: string;
        }
        class MixinService extends UserService {
          ttt() {
            return 'ttt';
          }
        }
        @Controller(config.get('test'))
        class MixinController extends UserController {
          constructor(readonly service: MixinService) {
            super(service);
          }
          @Get()
          ttt() {
            return this.service.ttt();
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          controllers: [MixinController],
          providers: [MixinService],
          entities: [MixinEntity],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
