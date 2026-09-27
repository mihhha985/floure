import { Controller, Get, Post, Patch, Put, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdminKeyGuard } from '../admin-key.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, ChangeStatusDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

	@Get()
	@UseGuards(AdminKeyGuard)
	findAll() {
		return this.orderService.findAll();
	}

	@Get(':id')
	@UseGuards(AdminKeyGuard)
	findOne(@Param('id', ParseIntPipe) id: number){
		return this.orderService.findOne(id);
	}

	@Post()
	create(@Body() dto:CreateOrderDto){
		return this.orderService.create(dto);

	}

	@Patch(':id')
	@UseGuards(AdminKeyGuard)
	update(
		@Body() dto:UpdateOrderDto, 
		@Param('id', ParseIntPipe) id: number){
		return this.orderService.update(id, dto);
	}

	@Put('status/:id')
	@UseGuards(AdminKeyGuard)
	changeStatus(
		@Body() dto:ChangeStatusDto, 
		@Param('id', ParseIntPipe) id: number){
		return this.orderService.changeStatus(id, dto);
	}

	@Put('comment/:id')
	@UseGuards(AdminKeyGuard)
	changeComment(
		@Body() dto:{comment:string}, 
		@Param('id', ParseIntPipe) id: number){
		return this.orderService.changeComment(id, dto);
	}
}
