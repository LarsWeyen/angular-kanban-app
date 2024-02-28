import { Column } from "./column";

export class Board{
    constructor(public boardId:number, public boardTitle : string, public boardColumns : Column[]) {}
}