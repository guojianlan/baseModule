import { Controller, Get, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user/entity';
import { UserModule } from './user/module'
import { BaseModule } from './base'
import { TagEntity } from './tag/entity';

const applyMixins = (derivedCtor: any, constructors: any[]) => {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
        Object.create(null)
      );
    });
  });
}
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/test.db',
      entities: [UserEntity, TagEntity],
      synchronize: true,
    }),
    BaseModule.forRootAsync({
      prefix: 'user', entity: UserEntity, extendFn: (controller, service) => {
     
        class A {
          @Get('ttt')
          testttt(){
            return 'ttt'
          }
        }
        applyMixins(controller,[A]);
        return [A , service]
      }
    }),
    BaseModule.forRootAsync({
      prefix: 'tag', entity: TagEntity, extendFn: (controller, service) => {
        return [controller, service]
      }
    })
    // UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
