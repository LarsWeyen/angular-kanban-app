import { Column } from "./column";
import { Subtask } from "./subtask";

export class Task{
    constructor(public title : string, public description: string,public subtasks: Subtask[],public column: Column){}
}