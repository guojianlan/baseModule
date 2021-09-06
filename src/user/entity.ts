import { Column, Entity } from 'typeorm';
import { AbstractTypeEntity } from 'nestjs-abstract-module';
@Entity('user')
export class UserEntity extends AbstractTypeEntity {
  @Column()
  name: string;
}
