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
  vwUserDetail:any;

  columnDefs = [
    {headerName: 'Login ID', field: 'LoginID' },
    {headerName: 'User Name', field: 'FirstName' + 'LastName' },
    {headerName: 'Email ID', field: 'Email'},
    {headerName: 'Lock Status', field: 'LockStatus'},
    {headerName: 'Active Status', field: 'ActiveStatus'},
    {headerName: 'Date Of Birth', field: 'DOB'},
    {headerName: 'Reset Password', field: ''},
    {headerName: 'Terminal Name', field: 'P1'}
];
  
constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService) 
              { }

  ngOnInit() {
   this.GetAllUsers();
  }

  ngAfterViewInit() {
    
  }

  GetAllUsers() {
    this.repository.getData('api/UserCreation/GetAllUsers?TerminalCode=DEL')
          .subscribe(response => {
            this.vwUserDetail = JSON.stringify(response);
          }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }
}



