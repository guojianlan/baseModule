import { Column, Entity } from "typeorm";
import { AbstractTypeEntity } from 'nestjs-abstract-module'
@Entity('tag')
export class TagEntity extends AbstractTypeEntity {
    @Column()
    name:string
}