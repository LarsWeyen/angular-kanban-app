import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Board } from './models/board';
import { CommonModule } from '@angular/common';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { MatDialog} from '@angular/material/dialog'
import { BoardService } from './board/board.service';
import { DialogTaskBodyComponent } from './dialog-task-body/dialog-task-body.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, CommonModule, DialogBodyComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
   constructor(private dialog:MatDialog, private store:BoardService){}
  ngOnInit(): void {
    this.store.getAllBoards().subscribe(boards => {
      this.boards = boards
    })
  }
   boards: Board[] = [];

   boardTitle: string = '';

   openNewTaskDialog(): void{
    const dialogRef = this.dialog.open(DialogTaskBodyComponent, {
      data: {boardTitle: this.boardTitle},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.boardTitle = result;
        this.store.addBoard(new Board(this.boards.length+1,result,[]));
      }
      
    });
   }

   openDialog(): void{
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      data: {boardTitle: this.boardTitle},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.boardTitle = result;
        this.store.addBoard(new Board(this.boards.length+1,result,[]));
      }
      
    });
   }
}
