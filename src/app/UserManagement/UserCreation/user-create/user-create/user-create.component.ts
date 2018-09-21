import { Component, OnInit } from '@angular/core';
import { DropDownList } from 'src/app/_interfaces/dropdownlist.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public genderLst: DropDownList[] = [
    new DropDownList(1, 'Select'),
    new DropDownList(2, 'Male'),
    new DropDownList(3, 'Female')
  ];

  public selectedGender: DropDownList = this.genderLst[0];

  public profilelst: DropDownList[] = [
    new DropDownList(1, 'Select'),
    new DropDownList(2, 'UserProfile'),
    new DropDownList(3, 'Profile')
  ];

  public selectedProfile: DropDownList = this.profilelst[0];

  public terminalst: DropDownList[] = [
    new DropDownList(1, 'Select'),
    new DropDownList(2, 'Delhi'),
    new DropDownList(3, 'Banglore')
  ];

  public selectedGender: DropDownList = this.genderLst[0];

  constructor() { }

  selectGender(id) {
    this.selectedGender = null;
    for (let i = 0; i < this.genderLst.length; i++) {
      {
        if (this.genderLst[i].id == id) {
          this.selectedGender = this.genderLst[i];
        }
      }
    }
    console.log(this.selectedGender);
  }

  selectprofile(id) {
    this.selectedProfile = null;
    for (let i = 0; i < this.profilelst.length; i++) {
      {
        if (this.profilelst[i].id == id) {
          this.selectedProfile = this.profilelst[i];
        }
      }
    }
    console.log(this.selectedProfile);
  }

  ngOnInit() {
  }

}
