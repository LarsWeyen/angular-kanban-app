import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { Task } from '../models/task';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Board } from '../models/board';
import { BoardService } from '../board/board.service';
import { Subtask } from '../models/subtask';
import { FormsModule } from '@angular/forms';

export interface DialogData {
  task: Task;
  board: Board;
}

@Component({
  selector: 'app-dialog-task-details',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatCheckboxModule, FormsModule],
  templateUrl: './dialog-task-details.component.html',
  styleUrl: './dialog-task-details.component.css'
})
export class DialogTaskDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogTaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private store: BoardService
  ) {}

  selectedStatus: string = this.data.task.column.columnTitle;

  toggleFullfilled(subtask: Subtask) {
    this.store.toggleCompletedSubtask(this.data.board.boardId,this.data.task,subtask)
  }

  getCompletedSubtasksCount(): number {
    return this.data.task.subtasks.filter(subtask => subtask.isComplete).length;
  }

  updateStatus(e: any) {
    this.store.changeTaskStatus(this.data.board.boardId,this.data.task,e.target.value)
  }
}
