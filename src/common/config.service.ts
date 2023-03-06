// src/config/config.service.ts
import * as dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from 'src/entities';

class ConfigService {
  constructor(
    private env: {
      [k: string]: string | undefined;
    } = process.env,
  ) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
  public get(key: string, throwOnMissing = true): string {
    return this.getValue.apply(this, [key, throwOnMissing]);
  }
  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getDefaultDBConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: entities,
      autoLoadEntities: true,
      //@TODO No migrations are pending ??? wtf
      migrations: [
        path.resolve(__dirname + '/../database/migrations/*{.ts,.js}'),
      ],

      // migrationsTableName: 'migrations',
      logging: true,
      synchronize: true,
    };
  }
}

const configService = new ConfigService().ensureValues([
  'PORT',
  // 'POSTGRES_HOST',
  // 'POSTGRES_PORT',
  // 'POSTGRES_USER',
  // 'POSTGRES_PASSWORD',
  // 'POSTGRES_DATABASE',
]);

export { configService, ConfigService };
