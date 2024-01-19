import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalog } from './entities/catalog.entity';
import { Parametrs } from './entities/parametrs.entity';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';
import * as fs from 'fs';



@Injectable()
export class CatalogService {
	constructor(
    @InjectRepository(Catalog)
    private catalogRepository: Repository<Catalog>,
		@InjectRepository(Parametrs)
		private parametrsRepository: Repository<Parametrs>,
  ) {}

	async findAll(): Promise<Catalog[]> {
    return await this.catalogRepository.find({
			relations:{
				category:true,
			}
		});
  }

  async findOne(id: number): Promise<Catalog | null> {
		try{
			const product = await this.catalogRepository.findOne({
				where:{id:id},
				relations:{
					category:true,
					parametrs:true,
					images:true,
				}
			})

			if(!product) throw new Error('Not found');
			return product;
		}catch(err){	
			throw err;
		}
  }

	async findByCategory(id: number): Promise<Catalog[]|[]> {
		try{
			return await this.catalogRepository.find({
				where:{category:{id:id}},
			});
		}catch(err){
			throw err;
		}
	}

	async create(dto:CreateCatalogDto, file:any): Promise<void>{
		let category:Catalog | null = null;

		try{
			if(file !== undefined){
				const ext = file.originalname.split('.').pop();
				const filename = uuidv4() + '.' + ext;
				const dirname  = process.env.STATIC_PATH
				if(!fs.existsSync(dirname)){
					fs.mkdirSync(dirname);
				}
				fs.writeFileSync(resolve(dirname, filename), file.buffer);
				category = this.catalogRepository.create({...dto, photo:filename});
				await this.catalogRepository.save(category);
			}else{
				category = this.catalogRepository.create({...dto});
				await this.catalogRepository.save(category);
			}

			const info = JSON.parse(dto.info);
			if(info.length > 0){
				const params = [];
				info.forEach(async (element: {size:string, cost:string}) => {
					const param = {
						size:element.size,
						cost:element.cost,
						catalog:category,
					};	

					params.push(param);
				});

				await this.parametrsRepository.insert(params);
			}
		}catch(err){
			throw err;
		}
	}

	async update(id: number, dto:UpdateCatalogDto, file:any): Promise<void> {
    try{

			if(file !== undefined){
				const ext = file.originalname.split('.').pop();
				const filename = uuidv4() + '.' + ext;
				const dirname  = process.env.STATIC_PATH
				if(!fs.existsSync(dirname)){
					fs.mkdirSync(dirname);
				}
				fs.writeFileSync(resolve(dirname, filename), file.buffer);
				await this.catalogRepository.update(id, {
					title:dto.title,
					description:dto.description,
					articule:dto.articule,
					photo:filename,
					category:{
						id:dto.category,
					}
				});
			}else{
				await this.catalogRepository.update(id, {
					title:dto.title,
					description:dto.description,
					articule:dto.articule,
					category:{
						id:dto.category,
					}
				});
			}

			await this.parametrsRepository.delete({catalog:{id:id}});
			const info = JSON.parse(dto.info);
			if(info.length > 0){
				const params = [];
				info.forEach((element: {size:string, cost:string}) => {
					const param = {
						size:element.size,
						cost:element.cost,
						catalog:{
							id:id
						}
					};	

					params.push(param);
				});

				await this.parametrsRepository.insert(params);
			}
		}catch(err){
			throw err;
		}
  }

	async setStatus(id: number, status: boolean):Promise<void>{
		await this.catalogRepository.update(id, {isActive: !status});
	}
}
