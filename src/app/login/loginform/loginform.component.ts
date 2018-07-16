import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginUser(e){
    e.preventDefault();
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    console.log(this.getRandomInt(0,990));
    const md5 = new Md5();
    var md5pwd = md5.appendStr(password).end()
    var md5pwdUsername =  md5pwd.toString().toUpperCase() + username;
    var md5pwdUsernamenew = md5.appendStr(md5pwdUsername).end();
    var md5pwdUsernamenewKey = md5pwdUsernamenew.toString().toUpperCase() + this.getRandomInt(0,990)
    console.log(md5pwdUsernamenewKey); 
    var Finalmd5pwdUsernamenewKey = md5.appendStr(md5pwdUsernamenewKey).end();
    console.log(Finalmd5pwdUsernamenewKey);
  }

   getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
