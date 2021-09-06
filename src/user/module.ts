import { Controller, Get, Injectable, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { Repository } from 'typeorm';
import { BaseController } from '../base/controller';
import { BaseService } from '../base/service';
import { UserEntity } from './entity';
// @Injectable()
// export class UserService extends BaseService<UserEntity> {
//     constructor(
//         @InjectRepository(UserEntity)
//         private readonly repository: Repository<UserEntity>,
//     ) {
//         super(repository, UserEntity);
//     }
// }

// @Controller('user')
// export class UserController extends BaseController {
//     constructor(readonly service: UserService,readonly appService: AppService) {
//         super(service);
//     }
//     @Get('ttt')
//     getttt(){
//         return this.service.findOne(1);
//     }
// }

// @Module({
//     imports: [TypeOrmModule.forFeature([UserEntity])],
//     controllers: [UserController],
//     providers: [UserService,AppService]
// })
export class UserModule {}
