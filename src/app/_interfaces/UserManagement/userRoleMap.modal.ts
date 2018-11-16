import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropDownList } from '../dropdownlist.model';

export class UserRoleMap {
    customSelected: string;
    formUserRoleMapGroup: FormGroup = null;
    fb: FormBuilder;

    public statusLst: DropDownList[] = [
        new DropDownList(1, 'Available'),
        new DropDownList(2, 'Allocated')
    ];

    constructor() {
        // var _builder = new FormBuilder();
        // this.formUserRoleMapGroup = _builder.group({});

        // this.formUserRoleMapGroup.addControl('customSelectedControl',  new FormControl('', Validators.required));
        // this.formUserRoleMapGroup.addControl('statusSelectedControl',  new FormControl(null));
    }

    formErrors = {
        'customSelectedControl': '',
        'statusSelectedControl': ''
    };


    validationMessages = {
        'customSelectedControl': {
            'required': 'customSelectedControl is required.'
        },
        'statusSelectedControl': {
            'required': 'statusSelectedControl is required.'
        }
    };

    buildForm(): void {
        this.formUserRoleMapGroup = this.fb.group({
            'customSelectedControl': ['customSelectedControl', Validators.required],
            'statusSelectedControl': ['statusSelectedControl', Validators.required]
        });

        this.formUserRoleMapGroup.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: any) {
        if (!this.formUserRoleMapGroup) { return; }
        const form = this.formUserRoleMapGroup;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
}
