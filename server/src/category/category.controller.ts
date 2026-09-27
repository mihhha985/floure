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
	Query, UseGuards
} from '@nestjs/common';
import { AdminKeyGuard } from '../admin-key.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminKeyGuard)
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(
		@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminKeyGuard)
  update(
	@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, 
	@Body() dto: UpdateCategoryDto
	) {
    return this.categoryService.update(id, dto);
  }

  @Put(':id')
  @UseGuards(AdminKeyGuard)
	setStatus
	(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, 
	@Query('status', new ParseBoolPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) status: boolean
	){	
		return this.categoryService.setStatus(+id, status)
	}

}
