import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: UserListComponent }
    ]),
    AgGridModule.withComponents([])
  ],
  declarations: [
    UserListComponent,
    JwPaginationComponent
  ]
})
export class UserCreationModule { }
