import { Component, OnInit, TemplateRef } from '@angular/core';
import { CreateRole, VsecRoleMst } from 'src/app/_interfaces/UserManagement/vsecRoleMst.modal';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  RoleModal: CreateRole = new CreateRole();
  public errorMessage = '';
  modalRef: BsModalRef;

  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private modalService: BsModalService,
    public datepipe: DatePipe) { }

  ngOnInit() {
  }

  public hasError(typeofvalidator: string, controlname: string): boolean {
    return this.RoleModal.formRoleGroup.controls[controlname].hasError(typeofvalidator);
  }

  public createRole(RoleFormValue, template: TemplateRef<any>) {
    const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    let todaysDate = new Date();
    console.log(this.datepipe.transform(todaysDate, 'yyyy-MM-dd HH:mm:ss'));
    let Role : VsecRoleMst = {
      roleId: 0,
      parentRoleId: null,
      roleSname: RoleFormValue.RoleSName,
      displayName: RoleFormValue.DisplayName,
      activeFlag: 'Y',
      status: 'A',
      mcStatus: 'A',
      createdBy: currentUser.UserInfo[0].loginID,
      createdOn: this.datepipe.transform(todaysDate, 'yyyy-MM-dd HH:mm:ss'),
      updatedBy: null,
      updatedOn: null,
      lastUpDtBy: null,
      lastUpDtOn: null,
    };

    let apiUrl = 'api/RoleCreation';
    this.repository.create(apiUrl, Role)
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
