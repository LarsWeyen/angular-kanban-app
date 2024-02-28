import { Column } from "./column";
import { Subtask } from "./subtask";

export class Task{
    constructor(public id:number, public title : string, description: string, subtasks: Subtask[], column: Column){}
}