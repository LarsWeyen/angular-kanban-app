import { Task } from "./task";

export class Column{
    constructor(public columnId:number, public columnTitle : string, public tasks: Task[]){}
}