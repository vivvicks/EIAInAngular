import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import {  GlobalValue } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  public errorMessage = '';
  public lstFinYear: any;
  public loginID = '';


  constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private globalValue: GlobalValue) { }

  ngOnInit() {
    this.GetFinYear();
    // const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    this.loginID = this.globalValue.getGV().loginID;
  }

  GetFinYear() {
    this.repository.getData('api/Utility/GetFinantialYear')
          .subscribe(response => {
            // console.log(response);
            this.lstFinYear = response;
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  LogOut() {
    // localStorage.removeItem('UserInfo');
    // localStorage.removeItem('jwt');
    // this.globalConfig[0].tokenString = '';
    this.globalValue.clearGV();
    this.router.navigate(['']);
  }

}
