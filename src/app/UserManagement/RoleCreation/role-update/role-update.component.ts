import { Component, OnInit, TemplateRef } from '@angular/core';
import { CreateRole, VsecRoleMst } from 'src/app/_interfaces/UserManagement/vsecRoleMst.modal';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { GlobalValue } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.css']
})
export class RoleUpdateComponent implements OnInit {

  RoleModal: CreateRole = new CreateRole();
  public errorMessage = '';
  modalRef: BsModalRef;
  vsecRoleMst: VsecRoleMst;

  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private modalService: BsModalService,
    public datepipe: DatePipe,
    private activeRoute: ActivatedRoute,
    private globalValue: GlobalValue) { }

  ngOnInit() {
    this.getRoleById();
  }

  private getRoleById() {
    let roleId: number = this.activeRoute.snapshot.params['id'];
    let roleByIdUrl = `api/RoleCreation/${roleId}`;

    this.repository.getData(roleByIdUrl)
      .subscribe(res => {
        this.vsecRoleMst = res as VsecRoleMst;
        this.RoleModal.RoleSname = this.vsecRoleMst.roleSname;
        this.RoleModal.DisplayName = this.vsecRoleMst.displayName;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public hasError(typeofvalidator: string, controlname: string): boolean {
    return this.RoleModal.formRoleGroup.controls[controlname].hasError(typeofvalidator);
  }

  public updateRole(RoleFormValue, template: TemplateRef<any>) {
    // const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    let todaysDate = new Date();
    console.log(this.datepipe.transform(todaysDate, 'yyyy-MM-dd HH:mm:ss'));
    let Role : VsecRoleMst = {
      roleId: this.vsecRoleMst.roleId,
      parentRoleId: null,
      roleSname: RoleFormValue.RoleSName,
      displayName: RoleFormValue.DisplayName,
      activeFlag: this.vsecRoleMst.activeFlag,
      status: this.vsecRoleMst.status,
      mcStatus: this.vsecRoleMst.mcStatus,
      createdBy: this.vsecRoleMst.createdBy,
      createdOn: this.vsecRoleMst.createdOn,
      updatedBy: this.globalValue.getGV().loginID,
      updatedOn: this.datepipe.transform(todaysDate, 'yyyy-MM-dd HH:mm:ss'),
      lastUpDtBy: this.globalValue.getGV().loginID,
      lastUpDtOn: this.datepipe.transform(todaysDate, 'yyyy-MM-dd HH:mm:ss'),
    };

    let apiUrl = 'api/RoleCreation';
    this.repository.update(apiUrl, Role)
      .subscribe(res => {
        this.modalRef = this.modalService.show(template);
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    );
  }

  public redirectToRoleList() {
    this.modalRef.hide();
    this.router.navigate(['/home/rolecreation/list']);
  }
}
