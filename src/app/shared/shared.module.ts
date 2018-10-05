import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRequireValidatorDirective } from '../shared/directives/select-require-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectRequireValidatorDirective
],
  exports: [
    SelectRequireValidatorDirective
  ]
})
export class SharedModule { }
