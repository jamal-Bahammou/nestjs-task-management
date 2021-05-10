import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { getTasksFilterDto } from './dto/get-tasks-filter.dto'
import { IsIn } from 'class-validator'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { Task } from './task.entity'

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    // getAllTasks(): Task[] {
    //     return this.tasks
    // }

    // getTasksWithFilters(filterDto: getTasksFilterDto): Task[] {
    //     const { status, search } = filterDto
    //     if(status) return this.tasks.filter(task => task.status === status)
    //     if(search) return this.tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    // }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id)
        if(!task) throw new NotFoundException(`Task with id '${id}' not exist`)
        return task
    }
 
    // getTaskById(id: string): Task {
    //     const task =  this.tasks.find(task => task.id === id)
    //     if(!task) throw new NotFoundException(`Task with id '${id}' not exist`)
    //     return task
    // }

    // createTask(CreateTaskDto: CreateTaskDto): Task {
    //     const { title, description } = CreateTaskDto
    //     const task: Task = {
    //         id: uuidv1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };

    //     this.tasks.push(task)
    //     return task
    // }

    // deleteTaskById(id: string): void {
    //     this.getTaskById(id)
    //     this.tasks = this.tasks.filter(task => task.id !== id)
    // }

    // updateTask(id: string, body): Task {
    //     return Object.assign(this.getTaskById(id),body)
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     let task = this.getTaskById(id)
    //     task.status = status
    //     return task
    // }
}
