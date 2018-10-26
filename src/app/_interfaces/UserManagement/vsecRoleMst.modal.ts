import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


export class VsecRoleMst {
    roleId: number;
    parentRoleId: number | null;
    roleSname: string;
    displayName: string;
    activeFlag: string;
    status: string;
    mcStatus: string;
    createdBy: string;
    createdOn: Date | string;
    updatedBy: string;
    updatedOn: Date | string | null;
    lastUpDtBy: string;
    lastUpDtOn: Date | string | null;
}

export class CreateRole {
    RoleSname: string;
    DisplayName: string;
    formRoleGroup: FormGroup = null;

    constructor() {
        var _builder = new FormBuilder();
        this.formRoleGroup = _builder.group({});
        this.formRoleGroup.addControl('RoleSName',  new FormControl('', Validators.required));

        var validationcollection = [];
        validationcollection.push(Validators.required);

        this.formRoleGroup.addControl('DisplayName',  new FormControl('', Validators.compose(validationcollection)));
    }
}
