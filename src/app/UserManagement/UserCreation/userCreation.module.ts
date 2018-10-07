import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create/user-create.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: UserListComponent },
      { path: 'create', component: UserCreateComponent },
      { path: 'update/:id', component: UserUpdateComponent }
    ]),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent
  ]
})
export class UserCreationModule { }
