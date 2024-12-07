import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  createTask(task: Omit<Task, 'id'>): Task {
    const id = randomUUID();
    const newTask: Task = {
      id,
      ...task
    }
    this.tasks.push(newTask)

    return newTask;
  }

  updateTask(id: string, update: Partial<Task>): Task {
    const taskIdx = this.tasks.findIndex((task) => task.id === id);

    if (taskIdx === -1) {
      throw new NotFoundException();
    }

    this.tasks[taskIdx] = {
      ...this.tasks[taskIdx],
      ...update,
    }

    return this.tasks[taskIdx];
  }

  deleteTask(id: string): Task {
    let deletedTask: Task | null = null;
    this.tasks = this.tasks.filter((task) => {
      if (task.id === id) {
        deletedTask = task;
        return false;
      } else {
        return true;
      }
    })

    if (!deletedTask) {
      throw new NotFoundException();
    }

    return deletedTask;
  }
}
