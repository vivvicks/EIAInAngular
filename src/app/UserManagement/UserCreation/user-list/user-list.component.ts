import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { UserDetail } from '../../../_interfaces/UserManagement/VWUserDetail.modal';
import { DropDownList } from '../../../_interfaces/dropdownlist.model';
import { Router } from '@angular/router';
import { GlobalValue } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  p: number = 1;
  public errorMessage = '';
  vwUserDetail: UserDetail[];
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
              private router: Router,
              private globalValue: GlobalValue) { }

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
    // const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    this.GetAllUsers(this.globalValue.getGV().terminalCode);
  }

  public GetAllUsers(TerminalCode) {
    this.repository.getData('api/UserCreation/GetAllUsers?TerminalCode=' + TerminalCode)
          .subscribe(response => {
           this.vwUserDetail = response as UserDetail[];
          }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public redirectToUpdatePage(id) {
    const updateUrl = `/home/usercreation/update/${id}`;
    this.router.navigate([updateUrl]);
  }

}



