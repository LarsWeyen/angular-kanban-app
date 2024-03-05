import { Column } from "./column";
import { Subtask } from "./subtask";

export class Task{
    constructor(public id:number, public title : string, public description: string,public subtasks: Subtask[],public columnId: number){}
}