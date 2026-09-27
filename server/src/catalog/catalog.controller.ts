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
  ,UseGuards
} from '@nestjs/common';
import { AdminKeyGuard } from '../admin-key.guard';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.findOne(+id);
  }

	@Get('category/:id')
	findByCategory(@Param('id', ParseIntPipe) id: number) {
		return this.catalogService.findByCategory(id);
	}
	
  @Post()
  @UseGuards(AdminKeyGuard)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
  create(
	@UploadedFile() file: Express.Multer.File,
	@Body() dto: CreateCatalogDto
	) {
    return this.catalogService.create(dto, file);
  }

  @Patch(':id')
  @UseGuards(AdminKeyGuard)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
  update(
	@Param('id', ParseIntPipe) id: number,
	@Body() dto: UpdateCatalogDto,
	@UploadedFile() file: Express.Multer.File | undefined
  ) {	
    return this.catalogService.update(+id, dto, file);
  }

	@Put(':id')
	@UseGuards(AdminKeyGuard)
	setStatus
		(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, 
		@Query('status', new ParseBoolPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) status: boolean
	){	
		return this.catalogService.setStatus(+id, status)
	}
}
