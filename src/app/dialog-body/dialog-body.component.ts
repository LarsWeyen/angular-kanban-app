import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  boardTitle: string;
}

@Component({
  selector: 'app-dialog-body',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './dialog-body.component.html',
  styleUrl: './dialog-body.component.css'
})
export class DialogBodyComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  boardTitle: string = '';


  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
