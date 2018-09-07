import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: UserListComponent }
    ]),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserListComponent
  ]
})
export class UserCreationModule { }
