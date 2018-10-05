import { Component, OnInit } from '@angular/core';
import { DropDownList } from 'src/app/_interfaces/dropdownlist.model';
import { RepositoryService } from '../../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UserDetail } from '../../../../_interfaces/UserManagement/VWUserDetail.modal'
import { NgForm } from '@angular/forms';

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
    contactNo: '',
    email: '',
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
  mobnumPattern = '((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

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

  CreateUser(form: NgForm) {
    console.log('hi');
      if (form.invalid) {
          return;
      }
      console.log(form);
    }
}
