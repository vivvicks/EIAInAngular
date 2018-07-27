import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Login } from '../../_interfaces/login.model';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  
  public errorMessage: string = '';
  public loginForm: FormGroup;
  RandomNumber:number;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public validateControl(controlName: string) {
    if (this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.loginForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  loginUser(loginFormValue){
    if (this.loginForm.valid) {
      this.RandomNumber = 66;
      const md5 = new Md5();
      var md5pwd = md5.appendStr(loginFormValue.password.trim().toUpperCase()).end()
      var md5pwdUsername =  md5pwd.toString().toUpperCase() + loginFormValue.loginId.trim().toUpperCase();
      var md5pwdUsernamenew = md5.appendStr(md5pwdUsername).end();
      var md5pwdUsernamenewKey = md5pwdUsernamenew.toString().toUpperCase() + this.RandomNumber
      var Finalmd5pwdUsernamenewKey = md5.appendStr(md5pwdUsernamenewKey).end();
      console.log(Finalmd5pwdUsernamenewKey);
      let login: Login = {
        LoginId: loginFormValue.loginId,
        Password: String(Finalmd5pwdUsernamenewKey).toUpperCase(),
        RandomNumber: this.RandomNumber,
        IPAddress: '',
        WebsessionID: '',
        Mode: ''
      }
     
      let apiUrl: string = `api/Login/login`;
      this.repository.create(apiUrl, login)
          .subscribe(res => {
            
          },
          (error => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;
          })
        ) 
    }
  }

   getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
