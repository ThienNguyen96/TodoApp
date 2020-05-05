import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { DetailTaskTodoComponent } from './components/detail-task-todo/detail-task-todo.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', pathMatch: 'prefix', component: LoginComponent },
  { path: 'main-page', pathMatch: 'prefix', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: 'task-detail/:id', pathMatch: 'prefix', component: DetailTaskTodoComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
