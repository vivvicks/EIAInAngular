import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../_interfaces/login.model';
import { md5 } from '../../_interfaces/md5';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { GlobalValue } from 'src/app/shared/services/global.service';
import { GlobalConfig } from 'src/app/_interfaces/UserManagement/userInfo.modal';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  invalidLogin: boolean;
  public errorMessage = '';
  public loginForm: FormGroup;
  RandomNumber: number;

  constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private globalValue: GlobalValue) { }

  ngOnInit() {
    this.Clear();
    this.loginForm = new FormGroup({
      loginId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public validateControl(controlName: string) {
    if (this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.loginForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }

  loginUser(loginFormValue) {
    if (this.loginForm.valid) {
      this.RandomNumber = this.getRandomInt(0, 990);
      const hashPwd = md5(loginFormValue.password).toUpperCase() + loginFormValue.loginId.toUpperCase();
      const hashPwdwithNumber = md5(hashPwd).toUpperCase() + this.RandomNumber;

      const login: Login = {
        LoginId: loginFormValue.loginId,
        Password: md5(hashPwdwithNumber),
        RandomNumber: this.RandomNumber,
        IPAddress: '',
        WebsessionID: '',
        Mode: 'Login'
      };
      this.repository.create('api/Login/login', login)
          .subscribe(response => {
        // const UserInfo = (<any>response).userInfo;
        // const TokenString = response[0].tokenString;
        // console.log(response[0].tokenString)
        this.globalValue.setGV(response);
        // this.globalValue.globalConfig.tokenString = TokenString;
        // console.log(this.globalValue.getGV());
        // localStorage.setItem('UserInfo', JSON.stringify({UserInfo : UserInfo}));
        // localStorage.setItem('jwt',  JSON.stringify({TokenString}));
        this.invalidLogin = false;
        this.router.navigate(['home']);
      }, err => {
        this.invalidLogin = true;
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
    }
  }

  Clear() {
    // remove user from local storage to log user out
    // localStorage.removeItem('UserInfo');
    // localStorage.removeItem('jwt');
    this.globalValue.clearGV();
}

   getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
