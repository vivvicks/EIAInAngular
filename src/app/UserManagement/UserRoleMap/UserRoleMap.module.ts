import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserrolemapListComponent } from './userrolemap-list/userrolemap-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'list', component: UserrolemapListComponent }
        ]),
    ],
    declarations: [
    UserrolemapListComponent]
})
export class UserRoleMapModule {
}
