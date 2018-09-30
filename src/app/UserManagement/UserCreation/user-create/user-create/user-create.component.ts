import { Component, OnInit } from '@angular/core';
import { DropDownList } from 'src/app/_interfaces/dropdownlist.model';
import { RepositoryService } from '../../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public errorMessage = '';
  public lstAirline: any;
  public selectedAirline: any;
  public createUserForm: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;

  public genderLst: DropDownList[] = [
    new DropDownList(0, 'Select'),
    new DropDownList(1, 'Male'),
    new DropDownList(2, 'Female')
  ];

  public selectedGender: DropDownList = this.genderLst[0];

  public profilelst: DropDownList[] = [
    new DropDownList(0, 'Select'),
    new DropDownList(1, 'UserProfile'),
    new DropDownList(2, 'Profile')
  ];

  public selectedProfile: DropDownList = this.profilelst[0];

  public terminalst: DropDownList[] = [
    new DropDownList(0, 'Select'),
    new DropDownList(1, 'Delhi'),
    new DropDownList(2, 'Banglore'),
    new DropDownList(3, 'Mumbai')
  ];

  public selectedterminal: DropDownList = this.genderLst[0];

  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router) {
      this.datePickerConfig = Object.assign({},
        {
          dateInputFormat: 'DD/MM/YYYY'
        });
     }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      DOB: new FormControl('', [Validators.required]),
    });
    this.GetAirlineLst();
  }

  selectGender(id) {
    this.selectedGender = null;
    for (let i = 0; i < this.genderLst.length; i++) {
      {
        if (this.genderLst[i].id == id) {
          this.selectedGender = this.genderLst[i];
        }
      }
    }
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
  }

  selectTerminal(id) {
    this.selectedterminal = null;
    for (let i = 0; i < this.terminalst.length; i++) {
      {
        if (this.terminalst[i].id == id) {
          this.selectedterminal = this.terminalst[i];
        }
      }
    }
  }

  selectAirline(AirlineCode) {
    this.selectedterminal = null;
    for (let i = 0; i < this.lstAirline.length; i++) {
      {
        if (this.lstAirline[i].airlineCode == AirlineCode) {
          this.selectedAirline = this.lstAirline[i];
        }
      }
    }
  }

  GetAirlineLst() {
    this.repository.getData('api/Utility/GetAirlineList')
          .subscribe(response => {
            this.lstAirline = response;
            this.lstAirline.splice(0, 0, {airlineCode: '0', airlineName: 'Select'});
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public validateControl(controlName: string) {
    if (this.createUserForm.controls[controlName].invalid && this.createUserForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.createUserForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }
}
