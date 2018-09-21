import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { VW_UserDetail } from '../../../_interfaces/UserManagement/VWUserDetail.modal';
import { DropDownList } from '../../../_interfaces/dropdownlist.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  p: number = 1;
  public errorMessage = '';
  vwUserDetail: VW_UserDetail[];
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
              private errorHandler: ErrorHandlerService) { }

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
   this.GetAllUsers();
  }

  GetAllUsers() {
    this.repository.getData('api/UserCreation/GetAllUsers?TerminalCode=DEL')
          .subscribe(response => {
           this.vwUserDetail = response as VW_UserDetail[];
          }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }
}



