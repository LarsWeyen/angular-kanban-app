import { Component,Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subtask } from '../models/subtask';
import { Board } from '../models/board';
import { Task } from '../models/task';
import { Column } from '../models/column';
import { BoardService } from '../board/board.service';

export interface DialogData {
  board: Board;
}

@Component({
  selector: 'app-dialog-task-body',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule,FormsModule,MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './dialog-task-body.component.html',
  styleUrl: './dialog-task-body.component.css'
})
export class DialogTaskBodyComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogTaskBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private store:BoardService
  ) {}
  column: any;
  title:string = '';
  description:string = '';
  subtasks:Subtask[] = [];
  subtaskInputs: string[] = [];
  private nextSubtaskId = 1

  addSubtask(){
    const newSubtask = new Subtask(this.nextSubtaskId,'',false);
    this.subtasks.push(newSubtask);
    this.nextSubtaskId++;
    // Assign a unique ngModel binding for the new subtask
    this.subtaskInputs.push('');
  }

  removeSubtask(i:number){
    this.subtasks.splice(i, 1);
    this.subtaskInputs.splice(i, 1);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  addTaskClick(){
    this.dialogRef.close(new Task(this.store.getLastTaskId()+1,this.title,this.description,this.subtasks,this.column.columnId));
  }
}
