import { Controller, Get, Post, Patch, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, ChangeStatusDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

	@Get()
	findAll() {
		return this.orderService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number){
		return this.orderService.findOne(id);
	}

	@Post()
	create(@Body() dto:CreateOrderDto){
		return this.orderService.create(dto);

	}

	@Patch(':id')
	update(
		@Body() dto:UpdateOrderDto, 
		@Param('id', ParseIntPipe) id: number){
		return this.orderService.update(id, dto);
	}

	@Put('status/:id')
	changeStatus(
		@Body() dto:ChangeStatusDto, 
		@Param('id', ParseIntPipe) id: number){
		return this.orderService.changeStatus(id, dto);
	}

	@Put('comment/:id')
	changeComment(
		@Body() dto:{comment:string}, 
		@Param('id', ParseIntPipe) id: number){
		return this.orderService.changeComment(id, dto);
	}
}
