import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RoleCreateComponent } from './role-create/role-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RoleUpdateComponent } from './role-update/role-update.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'list', component: RoleListComponent },
            { path: 'create', component: RoleCreateComponent },
            { path: 'update/:id', component: RoleUpdateComponent }
        ]),
        NgxPaginationModule,
        ModalModule.forRoot(),
    ],
    declarations: [
        RoleListComponent,
        RoleCreateComponent,
        RoleUpdateComponent
    ]
})
export class RoleCreationModule { }
