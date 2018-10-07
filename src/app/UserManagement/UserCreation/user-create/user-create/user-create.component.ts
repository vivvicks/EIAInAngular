import { Component, OnInit, TemplateRef } from '@angular/core';
import { DropDownList } from 'src/app/_interfaces/dropdownlist.model';
import { RepositoryService } from '../../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UserDetail } from '../../../../_interfaces/UserManagement/VWUserDetail.modal'
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
  modalRef: BsModalRef;

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
    private router: Router,
    private modalService: BsModalService) {
    this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit() {
    this.GetAirlineLst();
  }

  public GetAirlineLst() {
    this.repository.getData('api/Utility/GetAirlineList')
      .subscribe(response => {
        this.lstAirline = response;
        this.lstAirline.splice(0, 0, { airlineCode: '0', airlineName: 'Select' });
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public CreateUser(form: NgForm, template: TemplateRef<any>) {
    if (form.invalid) {
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    const SelectedTerminal: number = form.value.P1;
    let TerminalCode: string;
    switch (SelectedTerminal) {
      case 1:
        TerminalCode = 'DEL';
        break;
      case 2:
        TerminalCode = 'BLR';
        break;
      case 3:
        TerminalCode = 'BOM';
        break;
    }
    let user: UserDetail = {
      userMstID: 0,
      firstName: form.value.firstName,
      middleName: form.value.middleName,
      lastName: form.value.lastName,
      dOB: form.value.DOB,
      gender: form.value.gender == '1' ? 'M' : 'F',
      contactNo: form.value.contactno,
      email: form.value.EmailID,
      fatherName: form.value.fatherName,
      address1: form.value.Address1,
      address2: form.value.address2,
      address3: form.value.address3,
      empCode: null,
      p1: TerminalCode,
      p2: null,
      p3: null,
      loginID: form.value.LoginID,
      loginMId: 0,
      password: null,
      activeStatus: 'Y',
      profileId: form.value.profileId,
      contactPerson: null,
      applicationName: null,
      rPassword: null,
      mCAddress: null,
      lockStatus: 'A',
      name: null,
      mC_Status: 'A',
      status: 'A',
      createdBy: currentUser.UserInfo[0].userMstID,
      createdOn: null,
    };

    let apiUrl = 'api/UserCreation';
    this.repository.create(apiUrl, user)
      .subscribe(res => {
        this.modalRef = this.modalService.show(template);
        this.redirectToUserList();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  public redirectToUserList() {
    this.router.navigate(['/usercreation/list']);
  }
}
