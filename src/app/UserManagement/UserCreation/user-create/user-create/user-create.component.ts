import { Component, OnInit } from '@angular/core';
import { dropdownlist } from 'src/app/_interfaces/dropdownlist.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  genderItem: dropdownlist = new dropdownlist(1, 'select');

  genderLst = [
    new dropdownlist(1, 'select'),
    new dropdownlist(2, 'Male'),
    new dropdownlist(3, 'Female')
  ];

  constructor() { }

  selectGender(id) {
    this.genderItem = null;
    for (let i = 0; i < this.genderLst.length; i++) {
      {
        if (this.genderLst[i].id == id) {
          this.genderItem = this.genderLst[i];
        }
      }
    }
  }

  ngOnInit() {
  }

}
