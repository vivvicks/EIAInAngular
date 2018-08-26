import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public errorMessage = '';
  vwUserDetail: any;

  columnDefs = [
    {headerName: 'Login ID', field: 'loginID' },
    {headerName: 'User Name', field: 'firstName' },
    {headerName: 'Email ID', field: 'email'},
    {headerName: 'Lock Status', field: 'lockStatus'},
    {headerName: 'Active Status', field: 'activeStatus'},
    {headerName: 'Date Of Birth', field: 'dob'},
    {headerName: 'Reset Password', field: ''},
    {headerName: 'Terminal Name', field: 'p1'}
];

constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
   this.GetAllUsers();
  }

  GetAllUsers() {
    this.repository.getData('api/UserCreation/GetAllUsers?TerminalCode=DEL')
          .subscribe(response => {
            this.vwUserDetail = response;
          }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }
}



