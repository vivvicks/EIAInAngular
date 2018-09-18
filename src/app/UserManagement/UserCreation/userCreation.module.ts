import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create/user-create.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: UserListComponent },
      { path: 'create', component: UserCreateComponent },
    ]),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserListComponent,
    UserCreateComponent
  ]
})
export class UserCreationModule { }
