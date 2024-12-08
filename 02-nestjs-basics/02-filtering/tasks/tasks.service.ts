import { Injectable, BadRequestException } from "@nestjs/common";
import { Task, TaskSortBy, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page: number = 1,
    limit: number = 5,
    sortBy?: TaskSortBy,
  ): Task[] {
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException('pagination query must be positive');
    }

    let resTasks = [...this.tasks];
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;

    if (status) {
      resTasks = resTasks.filter((task) => task.status === status)
    }

    resTasks = resTasks.slice(startIdx, endIdx);

    if (sortBy) {
      resTasks.sort((taskA, taskB) => taskA[sortBy].localeCompare(taskB[sortBy]));
    }

    return resTasks;
  }
}
