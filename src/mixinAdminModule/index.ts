import { Controller, Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IModuleOrigin } from 'src/adminModule';
import { Column, Entity, Repository } from 'typeorm';

export const mixinAdminModule: ({
  Controllers,
  Services,
  entities,
}: IModuleOrigin) => {
  Controllers: any;
  Services: any;
  entities: any;
} = ({ Controllers, Services, entities }) => {
  console.log(Controllers, Services, entities);
  console.log(entities.UserEntity);
  @Entity('users')
  class MixinUserEntity extends entities.UserEntity {
    @Column({
      default: '',
    })
    mobile: string;
  }
  @Injectable()
  class MixinService extends Services.UserService {
    constructor(
      @InjectRepository(MixinUserEntity)
      readonly repository: Repository<MixinUserEntity>,
    ) {
      super(repository);
    }
    ttt(id: number) {
      return this.repository.findOne(id);
    }
  }
  @Controller('users')
  class MixinsUser extends Controllers.UserController {
    constructor(readonly service: MixinService) {
      super(service);
    }
    @Get('ttt')
    getTTT() {
      return this.service.ttt(3);
    }
  }
  return {
    Controllers: {
      MixinsUser,
    },
    Services: {
      MixinService,
    },
    entities: {
      MixinUserEntity,
    },
  };
};
