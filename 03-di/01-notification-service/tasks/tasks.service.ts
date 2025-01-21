import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private readonly userService: UsersService, private readonly notificationService: NotificationsService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    const user = this.userService.getUserById(assignedTo);
    this.tasks.push(task);
    this.notificationService.sendEmail(user.email, 'Новая задача', `Вы назначены ответственным за задачу: "${title}"`)

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    const user = this.userService.getUserById(task.assignedTo);
    Object.assign(task, updateTaskDto);
    const message = [
      updateTaskDto.title ? `Заголовок задачи "${task.title}" обновлён на "${updateTaskDto.status}"` : '',
      updateTaskDto.description  ? `Описание задачи "${task.title}" обновлёно на "${updateTaskDto.status}"` : '',
      updateTaskDto.status ? `Статус задачи "${task.title}" обновлён на "${updateTaskDto.status}"` : ''
    ].filter(Boolean);
    this.notificationService.sendSMS(user.phone, message.join(', '))
    return task;
  }
}
