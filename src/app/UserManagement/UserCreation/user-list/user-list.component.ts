import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { VW_UserDetail } from '../../../_interfaces/UserManagement/VWUserDetail.modal';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public errorMessage = '';
  vwUserDetail: Array<VW_UserDetail>;
  pageOfItems: Array<VW_UserDetail>;
  
constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
   this.GetAllUsers();
  }

  GetAllUsers() {
    this.repository.getData('api/UserCreation/GetAllUsers?TerminalCode=DEL')
          .subscribe(response => {           
           this.vwUserDetail = response as Array<VW_UserDetail>;           
          }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  onChangePage(pageOfItems: Array<VW_UserDetail>) {    
    this.pageOfItems = pageOfItems;
}

}



