import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmService ,BaseServiceClass} from 'nestjs-abstract-module'
import { Repository } from 'typeorm';
import { BaseEntity } from './entity';

export class BaseService<T> extends AbstractTypeOrmService<T>{}