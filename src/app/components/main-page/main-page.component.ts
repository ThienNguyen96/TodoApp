import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ListService } from 'src/app/service/list.service';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { List } from '../../modal/todoModal';
import { AuthService } from 'src/app/service/auth.service';

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
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getTodoLists();
    this.innerWidth = window.innerWidth;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
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
      this.openSnackBar('Add new list succesfully');
    }, (err) => {
      this.openSnackBar('Add new list failed');
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
      this.openSnackBar('Delete list succesfully');
    }, (err) => {
      this.openSnackBar('Delete list Failed');
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
          this.openSnackBar('Modify list succesfully');
          this.listTodoItem.map(item => {
            if (item.id === itemModify.id) {
              item.name = result;
            }
          });
        }, (err) => {
          this.openSnackBar('Modify list Failed');
        });
      }
    });
  }

  logOut() {
    this.authService.logout().subscribe(rs => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
