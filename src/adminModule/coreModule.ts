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
  async onModuleInit() {
    const container: NestContainer = global.app.container;
    const modules = generateModule(this.params);
    container.addModule(modules, []).then((resp) => {
      console.log(resp.token);
      console.log(resp.createModuleReferenceType());
      console.log(resp.metatype);

      // container.registerRequestProvider(resp.getProviderByKey(resp.id))
    });

    // console.log(global.test);
    console.log('1231312311111');
  }
}
