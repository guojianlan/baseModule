import {
  DynamicModule,
  Inject,
  Module,
  NestModule,
  Scope,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController, UserService } from '.';
import { ParamsAsync } from './types';
import { generateModule } from './user/module';
import { NestContainer } from '@nestjs/core';
@Module({})
export class AdminCoreModule implements NestModule {
  static forRootAsync(params: ParamsAsync): DynamicModule {
    console.log(params, 123);
    return {
      module: AdminCoreModule,
      imports: [...params.imports],
      providers: [
        {
          provide: '__ADMIN_PARAMS__',
          useFactory: params.useFactory,
          inject: params.inject,
        },
        {
          provide: 'test',
          useFactory: (params) => {
            console.log(params);
            // const modules = generateModule(params);
            console.log(global.test);

            return params;
          },
          inject: ['__ADMIN_PARAMS__'],
        },
      ],
    };
  }
  constructor(@Inject('__ADMIN_PARAMS__') readonly params: any) {
    console.log('123123');
  }
  configure() {
    console.log('124124');
  }
  onModuleInit() {
    const container: NestContainer = (global.test as any).container; //
    const modules = generateModule(this.params);
    container.addGlobalModule(modules);
    console.log(global.test);
    console.log('1231312311111');
  }
}
