import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(id, task);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }
}
