// config/ormconfig - migration.ts
import { configService } from '@/common/config.service';

import { DataSource, DataSourceOptions } from 'typeorm';
export const appDataSource = new DataSource(
  configService.getDefaultDBConfig() as DataSourceOptions,
);
//export default appDataSource;
