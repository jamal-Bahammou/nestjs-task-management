import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { getTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: getTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto)
        } else {
            return this.tasksService.getAllTasks()
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(CreateTaskDto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id')
    updateTask(@Param('id') id: string, @Body() body): Task {
        return this.tasksService.updateTask(id,body)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id,status)
    }
}
