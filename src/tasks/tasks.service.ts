import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { v1 as uuidv1 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto'
import { getTasksFilterDto } from './dto/get-tasks-filter.dto'
import { IsIn } from 'class-validator'

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks
    }

    getTasksWithFilters(filterDto: getTasksFilterDto): Task[] {
        const { status, search } = filterDto
        if(status) return this.tasks.filter(task => task.status === status)
        if(search) return this.tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    }

    getTaskById(id: string): Task {
        const task =  this.tasks.find(task => task.id === id)
        if(!task) throw new NotFoundException(`Task with id '${id}' not exist`)
        return task
    }

    createTask(CreateTaskDto: CreateTaskDto): Task {
        const { title, description } = CreateTaskDto
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task)
        return task
    }

    deleteTaskById(id: string): void {
        this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTask(id: string, body): Task {
        return Object.assign(this.getTaskById(id),body)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        let task = this.getTaskById(id)
        task.status = status
        return task
    }
}
