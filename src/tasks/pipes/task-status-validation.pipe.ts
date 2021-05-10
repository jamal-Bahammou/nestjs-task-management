import { BadRequestException, PipeTransform } from "@nestjs/common"
import { TaskStatus } from '../task-status.enum'

export class TaskStatusValidationPipe implements PipeTransform {
    transform(value: any) {
        if(!Object.values(TaskStatus).includes(value.toUpperCase()))
        throw new BadRequestException(`'${value}' is an invalid status`)
        return value.toUpperCase()
    }
}