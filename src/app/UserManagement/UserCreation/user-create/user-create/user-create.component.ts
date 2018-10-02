import { Component, OnInit } from '@angular/core';
import { DropDownList } from 'src/app/_interfaces/dropdownlist.model';
import { RepositoryService } from '../../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UserDetail } from '../../../../_interfaces/UserManagement/VWUserDetail.modal'

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public errorMessage = '';
  public lstAirline: any;
  public selectedAirline: any;
  datePickerConfig: Partial<BsDatepickerConfig>;
  public userdetail: UserDetail = {
    userMstID: null,
    firstName: null,
    middleName: null,
    lastName: null,
    dOB: null,
    gender: 'Select',
    contactNo: null,
    email: null,
    fatherName: null,
    address1: null,
    address2: null,
    address3: null,
    empCode: null,
    p1: 'Select',
    p2: null,
    p3: null,
    loginID: null,
    loginMId: null,
    password: null,
    activeStatus: null,
    profileId: -1,
    contactPerson: null,
    applicationName: null,
    rPassword: null,
    mCAddress: null,
    lockStatus: null,
    name: null,
    mC_Status: null,
    status: null,
    createdBy: null,
    createdOn: null,
  };


  public genderLst: DropDownList[] = [
    new DropDownList(1, 'Male'),
    new DropDownList(2, 'Female')
  ];

  public selectedGender: DropDownList = this.genderLst[0];

  public profilelst: DropDownList[] = [
    new DropDownList(1, 'UserProfile'),
    new DropDownList(2, 'Profile')
  ];

  public selectedProfile: DropDownList = this.profilelst[0];

  public terminalst: DropDownList[] = [
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
}
