import { Injectable } from '@angular/core';
import { asyncScheduler, scheduled } from 'rxjs';
import { Board } from '../models/board';
import { Column } from '../models/column';
import { Task } from '../models/task';
import { Subtask } from '../models/subtask';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private data: Board[] = [
    new Board(1,'Platform Launch',[
        {columnId: 1, columnTitle: 'TODO', tasks: [
          {title: 'test',description:'test',subtasks:[],column:{columnId:1,columnTitle: 'TODO',tasks:[]}}
        ]},
        {columnId: 2, columnTitle: 'DOING', tasks: []},
        {columnId: 3, columnTitle: 'Done', tasks: []},
    ]),
    new Board(2,'Marketing Plan',[]),
    new Board(3,'Roadmap',[])
  ]
  constructor() { }

  addBoard(board: Board){
    this.data.push(board);
  }
  
  addColumnToBoard(boardId: number, newColumn: Column){
    const boardIndex = this.data.findIndex(board => board.boardId === boardId);

    if (boardIndex !== -1) {
      this.data[boardIndex].boardColumns.push(newColumn);
    } else {
      console.error(`Board with ID ${boardId} not found.`);
    }
  }

  addTaskToColumn(boardId: number, newTask: Task){
    const boardIndex = this.data.findIndex(board => board.boardId === boardId);
    const columnIndex = this.data[boardIndex].boardColumns.findIndex(column => column.columnId === newTask.column.columnId)

    if (boardIndex !== -1) {
      this.data[boardIndex].boardColumns[columnIndex].tasks.push(newTask);
    } else {
      console.error(`Board with ID ${boardId} not found.`);
    }
  }

  getAllBoards(){
    return scheduled([this.data], asyncScheduler);
  }

  getBoard(id: number){
    return scheduled([this.data.find(b => b.boardId === id)],asyncScheduler);
  }

  toggleCompletedSubtask(boardId: number, task: Task, subtask: Subtask){
    const boardIndex = this.data.findIndex(board => board.boardId === boardId);
    const columnIndex = this.data[boardIndex].boardColumns.findIndex(column => column.columnId === task.column.columnId)
    const taskIndex = this.data[boardIndex].boardColumns[columnIndex].tasks.findIndex(t => t.title === task.title)
    const subtaskIndex = this.data[boardIndex].boardColumns[columnIndex].tasks[taskIndex].subtasks.findIndex(sub=> sub.title === subtask.title)

    if (boardIndex !== -1) {
      this.data[boardIndex].boardColumns[columnIndex].tasks[taskIndex].subtasks[subtaskIndex].isComplete = !this.data[boardIndex].boardColumns[columnIndex].tasks[taskIndex].subtasks[subtaskIndex].isComplete;
    } else {
      console.error(`Board with ID ${boardId} not found.`);
    }
  }
}
