import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskService } from 'src/app/service/task.service';
import { Task } from '../../modal/todoModal';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-detail-task-todo',
  templateUrl: './detail-task-todo.component.html',
  styleUrls: ['./detail-task-todo.component.scss']
})
export class DetailTaskTodoComponent implements OnInit {
  listTaskItem: Task[];
  taskTitle: string;
  idList: number;
  completedTask = 0;
  remainingTask = 0;

  constructor(
    private taskService: TaskService,
    private router: ActivatedRoute,
    private route: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(router => {
      this.idList = router.id;
      this.getTaskData(router.id);
    });

    this.getNameList();
  }

  countTask(listTask: Task[]) {
    if (listTask) {
      this.completedTask = listTask.filter(task => task.completed).length;
      this.remainingTask = listTask.filter(task => !task.completed).length;
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  getNameList() {
    this.router.queryParams.subscribe(router => {
      this.taskTitle = router.name;
    });
  }

  getTaskData(id: number) {
    this.taskService.getTasks(id).subscribe(res => {
      if (res) {
        this.listTaskItem = res;
        this.countTask(this.listTaskItem);
      }
    }, (err) => {
      this.openSnackBar('get task data failed');
    });
  }

  addNewTask() {
    const config = {
      width: '250px',
      data: { newTask: true }
    };
    const dialogRef = this.dialog.open(TodoModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(this.idList, result).subscribe(res => {
          this.listTaskItem.push(res);
          this.countTask(this.listTaskItem);
          this.openSnackBar('create task successfully');
        }, (err) => {
          this.openSnackBar('create task failed');
        });
      }
    });
  }

  onCheck(taskId: number) {
    this.listTaskItem.map((item, index) => {
      if (item.id === taskId) {
        item.completed = !item.completed;
        this.taskService.modifyTask(this.idList, taskId, item).subscribe(res => {
          this.listTaskItem.splice(index, 1, res);
          this.countTask(this.listTaskItem);
          this.openSnackBar('Modify task successfully');
        }, (err) => {
          this.openSnackBar('Modify task failed');
        });
      }
    });
  }

  deleteTask(taskId: number) {
    this.listTaskItem.map((item, index) => {
      if (item.id === taskId) {
        this.taskService.deleteTask(this.idList, taskId).subscribe(res => {
          this.listTaskItem.splice(index, 1);
          this.countTask(this.listTaskItem);
          this.openSnackBar('Delete task successfully');
        }, (err) => {
          this.openSnackBar('Delete task failed');
        });
      }
    });
  }

  onEdit(task: Task) {
    const config = {
      width: '250px',
      data: { editTask: true, name: task.name }
    };
    const dialogRef = this.dialog.open(TodoModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listTaskItem.map((item) => {
          if (item.id === task.id) {
            item.name = result;
            this.taskService.modifyTask(this.idList, task.id, item).subscribe(res => {
              this.countTask(this.listTaskItem);
              this.openSnackBar('Modify task successfully');
            }, (err) => {
              this.openSnackBar('Modify task failed');
            });
          }
        });
      }
    });
  }

  logOut() {
    this.authService.logout().subscribe(rs => {
      localStorage.clear();
      this.route.navigate(['/login']);
    });
  }
}
