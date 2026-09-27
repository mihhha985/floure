import { DataSource, DataSourceOptions } from "typeorm";
import '../config/environment';
import { resolve } from 'path';

export const dataSourceOptions:DataSourceOptions = {
	type: "postgres",
	port: Number(process.env.DB_PORT || 5432),
	host: process.env.DB_HOST || '127.0.0.1',
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [resolve(__dirname, '../src/**/entities/*.entity.{js,ts}')],
  migrations: [resolve(__dirname, 'migrations/*.{js,ts}')],
	migrationsRun: true,
	synchronize: false,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

