import { DynamicModule, Module, Controller, Injectable } from '@nestjs/common';
import { BaseController } from './controller'
import { BaseService } from './service'
import { BaseEntity } from './entity'
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({})
export class BaseModule {
    static forRootAsync(params: { prefix: string, entity: any, extendFn: (controller: any, service: any) => any, controller?: any[], provider?: any[] }): DynamicModule {
        @Injectable()
        class InjectBaseService extends BaseService<typeof params.entity> {
            constructor(
                @InjectRepository(params.entity)
                private readonly repository: Repository<typeof params.entity>,
            ) {
                super(repository, params.entity);
            }
        }
        @Controller(params.prefix)
        class InjectBaseController extends BaseController {
            constructor(readonly service: InjectBaseService) {
                super(service);
            }
        }
        let [ExtendController, ExtendService] = params.extendFn(InjectBaseController, InjectBaseService)
        return {
            module: BaseModule,
            imports: [TypeOrmModule.forFeature([params.entity])],
            controllers: [InjectBaseController],
            providers: [InjectBaseService],
            exports: [InjectBaseService]
        }
    }
}
