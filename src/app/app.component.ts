import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterModule,
  RouterOutlet,
  RoutesRecognized,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Board } from './models/board';
import { CommonModule } from '@angular/common';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from './board/board.service';
import { DialogTaskBodyComponent } from './dialog-task-body/dialog-task-body.component';
import { Task } from './models/task';

export interface DialogData {
  board: Board;
  task: Task;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    CommonModule,
    DialogBodyComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private store: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  board: any = [];

  ngOnInit(): void {
    this.store.getAllBoards().subscribe((boards) => {
      this.boards = boards;
    });

    this.router.events.subscribe((val) => {
      if (val instanceof RoutesRecognized) {
        let id = val.state.root.firstChild?.params['id'];
        if (id) {
          this.store
            .getBoard(parseInt(id, 10))
            .subscribe((board) => (this.board = board));
        }
      }
    });

    this.route.paramMap.subscribe((params: ParamMap) => {});
  }
  boards: Board[] = [];
  task: any;
  boardTitle: string = '';

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(DialogTaskBodyComponent, {
      data: { board: this.board, task: this.task },
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
         this.store.addTaskToColumn(this.board.boardId,result);
         console.log(this.board)
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      data: { boardTitle: this.boardTitle },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardTitle = result;
        this.store.addBoard(new Board(this.boards.length + 1, result, []));
      }
    });
  }
}
