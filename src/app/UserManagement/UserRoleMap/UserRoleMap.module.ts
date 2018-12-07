import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserrolemapListComponent } from './userrolemap-list/userrolemap-list.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'list', component: UserrolemapListComponent }
        ]),
        NgxPaginationModule,
        TypeaheadModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
    UserrolemapListComponent]
})
export class UserRoleMapModule {
}
