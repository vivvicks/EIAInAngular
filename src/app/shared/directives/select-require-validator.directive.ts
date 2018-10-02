import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appSelectValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: SelectRequireValidatorDirective,
        multi: true
    }]
})
export class SelectRequireValidatorDirective implements Validator {
    @Input() appSelectValidator: string;
    validate(control: AbstractControl): {[key: string]: any} | null {
        console.log(control.value);
        console.log(this.appSelectValidator);
        return control.value == this.appSelectValidator ? {'defaultSelected': true} : null;
    }
}
