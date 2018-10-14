import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'list', component: RoleListComponent },
        ]),
        NgxPaginationModule,
    ],
    declarations: [
        RoleListComponent
    ]
})
export class RoleCreationModule { }
