import { Injectable } from '@angular/core';
import { asyncScheduler, scheduled } from 'rxjs';
import { Board } from '../models/board';
import { Column } from '../models/column';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private data: Board[] = [
    new Board(1,'Platform Launch',[
        {columnId: 1, columnTitle: 'TODO'},
        {columnId: 2, columnTitle: 'DOING'},
        {columnId: 3, columnTitle: 'Done'},
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
    console.log(boardIndex)
    if (boardIndex !== -1) {
      this.data[boardIndex].boardColumns.push(newColumn);
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
}
