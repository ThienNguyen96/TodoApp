import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss']
})
export class TodoModalComponent implements OnInit {
  listName: string;

  constructor(
    private dialogRef: MatDialogRef<TodoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data) {
      this.listName = this.data.name;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
