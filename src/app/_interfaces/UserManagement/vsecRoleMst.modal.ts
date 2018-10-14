export class VsecRoleMst {
    RoleId: number;
    ParentRoleId: number | null;
    RoleSname: string;
    DisplayName: string;
    ActiveFlag: string;
    Status: string;
    McStatus: string;
    CreatedBy: string;
    CreatedOn: Date | string;
    UpdatedBy: string;
    UpdatedOn: Date | string | null;
    LastUpDtBy: string;
    LastUpDtOn: Date | string | null;
}
