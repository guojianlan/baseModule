import { Controller, Get, Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './adminModule/module';
import { UserEntity, UserController, UserService } from './adminModule/user';
import { Constructor } from 'nestjs-abstract-module';
import { Column, Entity, EntityRepository, Repository } from 'typeorm';
const applyMixins = (derivedCtor: any, constructors: any[]) => {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null),
      );
    });
  });
};
const HocOriginClass = <T extends Constructor, Y extends Constructor>(
  Base: T,
  ExtendClass: Y,
) => {
  if (ExtendClass) {
    Object.getOwnPropertyNames(ExtendClass.prototype).forEach((name) => {
      if (name !== 'constructor') {
        Base.prototype[name] = ExtendClass.prototype[name];
      }
    });
  }
};
@Entity('user')
class A extends UserEntity {
  @Column({
    nullable: true,
  })
  username: string;
}

@Injectable()
export class ExtendService extends UserService {
  constructor(
    @InjectRepository(A)
    readonly repository: Repository<A>,
  ) {
    super(repository);
  }
  ttt() {
    return this.repository.findOne();
  }
}
@Controller('user')
export class ExtendController extends UserController {
  constructor(readonly service: ExtendService) {
    super(service);
  }
  @Get('ccc')
  getCCC() {
    return this.service.ttt();
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/test.db',
      entities: [UserEntity],
      synchronize: true,
    }),
    AdminModule.forRootAsync({
      imports: [TypeOrmModule],
      useFactory: async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        return {
          controllers: [ExtendController],
          providers: [ExtendService],
          entities: [A],
        };
      },
    }),
    // UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
