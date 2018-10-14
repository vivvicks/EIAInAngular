import { Component, OnInit } from '@angular/core';
import { DropDownList } from 'src/app/_interfaces/dropdownlist.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { VsecRoleMst } from 'src/app/_interfaces/UserManagement/vsecRoleMst.modal';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  p: number = 1;
  public errorMessage = '';
  vsecRoleMst: VsecRoleMst[];
  itemsPerPage: DropDownList = new DropDownList(1, '5');
  perpage: number = +this.itemsPerPage.name;

  itemsPerPages = [
    new DropDownList(1, '5'),
    new DropDownList(2, '10'),
    new DropDownList(3, '20'),
    new DropDownList(4, '30'),
    new DropDownList(5, '40'),
    new DropDownList(6, '50')
  ];

  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }


  selectChangeHandler(id) {
    this.itemsPerPage = null;
    this.perpage = null;
    for (let i = 0; i < this.itemsPerPages.length; i++) {
      {
        if (this.itemsPerPages[i].id == id) {
          this.itemsPerPage = this.itemsPerPages[i];
        }
      }
    }
    this.perpage = +this.itemsPerPage.name;
  }

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
