import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { AdminCoreModule } from './coreModule';
import { ParamsAsync } from './types';

@Module({})
export class AdminModule {
  static forRootAsync(params?: ParamsAsync): DynamicModule {
    return {
      module: AdminModule,
      imports: [AdminCoreModule.forRootAsync(params)],
    };
  }
}
// imports: [
//     TypeOrmModule.forFeature(
//       params && params.entities ? params.entities : [UserEntity],
//     ),
//   ],
//   controllers:
//     params && params.controllers ? params.controllers : [UserController],
//   providers: params && params.providers ? params.providers : [UserService],
