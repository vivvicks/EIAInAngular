import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

export class UserRoleMap {
    customSelected: string;
    formUserRoleMapGroup: FormGroup = null;

    constructor() {
        var _builder = new FormBuilder();
        this.formUserRoleMapGroup = _builder.group({});

        this.formUserRoleMapGroup.addControl('customSelectedControl',  new FormControl('', Validators.required));
    }
}
