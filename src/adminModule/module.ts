import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminCoreModule } from './coreModule';
import { ParamsAsync, Params } from './types';
import { UserController, UserService, UserEntity, } from './user';
export class generateClass {
  static controllers = { UserController }
  static services = { UserService }
  static entities = { UserEntity }
}
export interface IModuleOrigin {
  Controllers: {
    UserController:typeof UserController
  }
  Services: {
    UserService: typeof UserService
  }
  entities: {
    UserEntity:typeof  UserEntity
  }
}
export const generaOriginFn = () => {
  return {
    Controllers: {
      UserController: generateClass.controllers.UserController
    },
    Services: {
      UserService: generateClass.services.UserService
    },
    entities: {
      UserEntity: generateClass.entities.UserEntity
    }
  }
}
@Module({})
export class AdminModule {
  static forRootAsync(params?: Params): DynamicModule {
    return {
      module: AdminModule,
      imports: [
        TypeOrmModule.forFeature(
          params && params.entities ? params.entities : [UserEntity],
        ),
      ],
      controllers:
        params && params.controllers ? params.controllers : [UserController],
      providers: params && params.providers ? params.providers : [UserService],
    };
  }
}

