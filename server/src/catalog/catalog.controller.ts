import {
	UploadedFile,
	UseInterceptors,
	HttpStatus,
	ParseBoolPipe,
	ParseIntPipe, 
	Controller, 
	Get, 
	Post, 
	Put, 
	Body, 
	Patch, 
	Param, 
	Query 
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'


@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

	@Get()
  findAll() {
    return this.catalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogService.findOne(+id);
  }

	@Get('category/:id')
	findByCategory(@Param('id', ParseIntPipe) id: number) {
		return this.catalogService.findByCategory(id);
	}
	
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
	@UploadedFile() file: Express.Multer.File,
	@Body() dto: CreateCatalogDto
	) {
    return this.catalogService.create(dto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
	@Param('id') id: string, 
	@Body() dto: UpdateCatalogDto,
	@UploadedFile() file: Express.Multer.File | undefined
  ) {	
    return this.catalogService.update(+id, dto, file);
  }

	@Put(':id')
	setStatus
		(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, 
		@Query('status', new ParseBoolPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) status: boolean
	){	
		return this.catalogService.setStatus(+id, status)
	}
}
