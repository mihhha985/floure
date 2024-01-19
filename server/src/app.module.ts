import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './catalog/catalog.module';
import {dataSourceOptions} from 'db/orm.config';
import { CategoryModule } from './category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
		ServeStaticModule.forRoot({
			rootPath: resolve(__dirname, '..', '..', 'uploads') 
			//'C:/project/floure/server/uploads',
		}),
		TypeOrmModule.forRoot(dataSourceOptions),
		CatalogModule,
		CategoryModule,
		OrderModule,
	],
})
export class AppModule {}