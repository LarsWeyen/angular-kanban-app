import { Component,Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  boardTitle: string;
}

@Component({
  selector: 'app-dialog-task-body',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './dialog-task-body.component.html',
  styleUrl: './dialog-task-body.component.css'
})
export class DialogTaskBodyComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogTaskBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  title:string = '';
  description:string = '';
  subtask:string = '';

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
