import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { Task } from '../models/task';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Board } from '../models/board';
import { BoardService } from '../board/board.service';
import { Subtask } from '../models/subtask';
import { FormsModule } from '@angular/forms';
import { Column } from '../models/column';

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
export class DialogTaskDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogTaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private store: BoardService
  ) {}

  column : Column|undefined;
  selectedStatus: string|undefined;

  ngOnInit(): void {
    this.column = this.store.getColumnById(this.data.task.columnId);
    this.selectedStatus = this.column?.columnTitle;
  }

   

  toggleFullfilled(subtask: Subtask) {
    this.store.toggleCompletedSubtask(this.data.board.boardId,this.data.task,subtask)
  }

  getCompletedSubtasksCount(): number {
    return this.data.task.subtasks.filter(subtask => subtask.isComplete).length;
  }

  updateStatus(e: any) {
    this.store.changeTaskStatus(this.data.task,e.target.value)
  }
}
