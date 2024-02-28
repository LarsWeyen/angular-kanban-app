import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Board } from '../models/board';
import { CommonModule } from '@angular/common';
import { Column } from '../models/column';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  board: any = {}
  boardId: number = 0;
  constructor(private store: BoardService, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');

      if(id){
        this.boardId = parseInt(id,10)
        this.store.getBoard(this.boardId).subscribe(board => this.board = board)
        console.log(this.board)
      }
    })
  }

  addNewColumnToBoard(): void{
    const newColumn: Column = { columnId: this.board.boardColumns.length+1, columnTitle: 'New Column'}

    this.store.addColumnToBoard(this.boardId,newColumn)
  }

}
