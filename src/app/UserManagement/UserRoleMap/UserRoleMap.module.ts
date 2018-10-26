import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserrolemapListComponent } from './userrolemap-list/userrolemap-list.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'list', component: UserrolemapListComponent }
        ]),
        TypeaheadModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
    UserrolemapListComponent]
})
export class UserRoleMapModule {
}
