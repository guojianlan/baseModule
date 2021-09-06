import { WrapController, AbstractTypeEntity } from 'nestjs-abstract-module'
import { BaseEntity } from './entity'
import { BaseService } from './service'
const CrudController = WrapController({
    model: BaseEntity,
})
export class BaseController extends CrudController {}