import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { VsecRoleMst } from '../../../_interfaces/UserManagement/vsecRoleMst.modal';
import { UserRoleMap } from '../../../_interfaces/UserManagement/userRoleMap.modal';

@Component({
  selector: 'app-userrolemap-list',
  templateUrl: './userrolemap-list.component.html',
  styleUrls: ['./userrolemap-list.component.css']
})
export class UserrolemapListComponent implements OnInit {

  public errorMessage = '';
  vsecRoleMst: VsecRoleMst[];
  UserRoleMapModal: UserRoleMap = new UserRoleMap();

  constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.GetAllRoles();
  }

  public GetAllRoles() {
    this.repository.getData('api/RoleCreation/GetAllRoles')
          .subscribe(response => {
           this.vsecRoleMst = response as VsecRoleMst[];
          }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }


}
