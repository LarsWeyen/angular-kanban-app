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
    {
      boardId: 1,
      boardTitle: 'Sample Board',
      boardColumns: [
        {
          columnId: 1,
          columnTitle: 'To Do',
          tasks: [
            {
              id: 1,
              title: 'Task 1',
              description: 'Description for Task 1',
              columnId: 1,
              subtasks: [
                { id: 1, title: 'Subtask 1', isComplete: false },
                { id: 2, title: 'Subtask 2', isComplete: true },
              ],
            },          
          ],
        },
        {
          columnId: 2,
          columnTitle: 'In Progress',
          tasks: [
            {
              id: 2,
              title: 'Task 2',
              description: 'Description for Task 2',
              columnId: 2,
              subtasks: [
                { id: 3, title: 'Subtask 3', isComplete: false },
              ],
            },
            
          ],
        },
        
      ],
    },
    
  ];
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

  addTaskToColumn(columnId: number, newTask: Task){
    // const boardIndex = this.data.findIndex(board => board.boardId === boardId);
    // const columnIndex = this.data[boardIndex].boardColumns.findIndex(column => column.columnId === newTask.columnId)

    const column = this.getColumnById(columnId)
    
    if(column){
      
      column.tasks.push(newTask);
    }

    // if (boardIndex !== -1) {
    //   this.data[boardIndex].boardColumns[columnIndex].tasks.push(newTask);
    // } else {
    //   console.error(`Board with ID ${boardId} not found.`);
    // }
  }

  getAllBoards(){
    return scheduled([this.data], asyncScheduler);
  }

  getBoard(id: number){
    return scheduled([this.data.find(b => b.boardId === id)],asyncScheduler);
  }

  toggleCompletedSubtask(boardId: number, task: Task, subtask: Subtask){
    const board = this.data.find(board => board.boardId === boardId);

    if (board) {
      const column = board.boardColumns.find(column => column.columnId === task.columnId);
  
      if (column) {
        const taskToUpdate = column.tasks.find(t => t.title === task.title);
  
        if (taskToUpdate) {
          const subtaskToUpdate = taskToUpdate.subtasks.find(sub => sub.title === subtask.title);
  
          if (subtaskToUpdate) {
            subtaskToUpdate.isComplete = !subtaskToUpdate.isComplete;
          } else {
            console.error(`Subtask with title ${subtask.title} not found in task.`);
          }
        } else {
          console.error(`Task with title ${task.title} not found in column.`);
        }
      } else {
        console.error(`Column with ID ${task.columnId} not found.`);
      }
    } else {
      console.error(`Board with ID ${boardId} not found.`);
    }
  }

  changeTaskStatus(task: Task, newStatus: string){
    
    const taskColumn = this.getColumnById(task?.columnId)
    for (const board of this.data) {
      for (const column of board.boardColumns) {
        if(taskColumn){
          if (column.columnTitle === newStatus) {
            
            const taskIndex = taskColumn.tasks.findIndex((t) => t.id === task?.id);
            taskColumn.tasks.splice(taskIndex, 1);
            task.columnId = column.columnId;
            column.tasks.push(task);
          
        }
        }
      }
    }
  }

  getColumnById(columnId: number): Column | undefined {
    for (const board of this.data) {
      for (const column of board.boardColumns) {
        if (column.columnId === columnId) {
          return column;
        }
      }
    }
    return undefined;
  }

  getTaskById(taskId: number): Task | undefined {
    for (const board of this.data) {
      for (const column of board.boardColumns) {
        const task = column.tasks.find((t)=> t.id===taskId)
        if(task){
          return task;
        }
      }
    }
    return undefined;
  }

  getLastTaskId(): number {
    let lastTaskId: number = 0;

    for (const board of this.data) {
      for (const column of board.boardColumns) {
        for (const task of column.tasks) {
          if (task.id > lastTaskId) {
            lastTaskId = task.id;
          }
        }
      }
    }

    return lastTaskId;
  }
}
