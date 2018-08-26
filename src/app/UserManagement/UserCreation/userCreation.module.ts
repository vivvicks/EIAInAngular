import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: UserListComponent }
    ]),
    AgGridModule.withComponents([])
  ],
  declarations: [
    UserListComponent
  ]
})
export class UserCreationModule { }
