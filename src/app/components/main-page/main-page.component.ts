import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ListService } from 'src/app/service/list.service';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { List } from '../../modal/todoModal';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  listTodoItem: List[];
  public innerWidth: any;
  col = 3;
  isLogin = true;

  constructor(
    private listService: ListService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTodoLists();
    this.innerWidth = window.innerWidth;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getTodoLists() {
    this.listService.getLists().subscribe(res => {
      this.listTodoItem = res;
    });
  }

  addNewTodo(name: string) {
    this.listService.addNewList(name).subscribe(res => {
      this.listTodoItem.push(res);
      this.openSnackBar('Add new list succesfully', null);
    }, (err) => {
      this.openSnackBar('Add new list failed', null);
    });
  }

  onAddNew() {
    const config = {
      width: '250px'
    };
    const dialogRef = this.dialog.open(TodoModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewTodo(result);
      }
    });
  }

  onDeleteList(id: number) {
    this.listService.removeList(id).subscribe(res => {
      const listItem = this.listTodoItem.filter(item => item.id !== id);
      this.listTodoItem = listItem;
      this.openSnackBar('Delete list succesfully', null);
    }, (err) => {
      this.openSnackBar('Delete list Failed', null);
    });
  }

  onEditList(itemModify: List) {
    const config = {
      width: '250px',
      data: itemModify
    };
    const dialogRef = this.dialog.open(TodoModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listService.modifyList(itemModify.id, result).subscribe(res => {
          this.openSnackBar('Modify list succesfully', null);
          this.listTodoItem.map(item => {
            if (item.id === itemModify.id) {
              item.name = result;
            }
          });
        }, (err) => {
          this.openSnackBar('Modify list Failed', null);
        });
      }
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
