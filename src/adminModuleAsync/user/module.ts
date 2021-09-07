import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export const generateModule = ({ controllers, providers, entities }): any => {
  console.log(controllers, providers, entities);
  @Module({
    imports: [TypeOrmModule.forFeature(entities)],
    controllers: controllers,
    providers: providers,
  })
  class UserModule {}
  return UserModule;
};
