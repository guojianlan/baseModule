import { ModuleMetadata } from '@nestjs/common';

export interface Params {
  controllers: any[];
  providers: any[];
  entities: any[];
}

export interface ParamsAsync extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory?: (...args: any[]) => Params | Promise<Params> | undefined;
}
