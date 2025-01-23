import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Get()
  findAll() {
    return this.todoListService.findAll();
  }

  @Post()
  addOne(@Body('title') title: string) {
    return this.todoListService.addOne(title);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.todoListService.deleteById(id);
  }
}
