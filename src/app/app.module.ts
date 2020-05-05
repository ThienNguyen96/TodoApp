import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TodoModalComponent } from './components/todo-modal/todo-modal.component';
import { DetailListTodoComponent } from './components/detail-list-todo/detail-list-todo.component';
import { DetailTaskTodoComponent } from './components/detail-task-todo/detail-task-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    TodoModalComponent,
    DetailListTodoComponent,
    DetailTaskTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [TodoModalComponent]
})
export class AppModule { }
