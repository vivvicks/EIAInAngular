import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormIComponent } from './form-i/form-i.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild([
        { path: 'FormI', component: FormIComponent },
      ]),
      NgxPaginationModule,
      FormsModule,
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      ModalModule.forRoot(),
      SharedModule
    ],
    declarations: [
        FormIComponent
    ]
  })
  export class PreStageModule { }
