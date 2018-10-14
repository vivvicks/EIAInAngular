import { Component, OnInit, TemplateRef } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from 'src/app/_interfaces/UserManagement/VWUserDetail.modal';
import { DropDownList } from 'src/app/_interfaces/dropdownlist.model';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  public errorMessage = '';
  datePickerConfig: Partial<BsDatepickerConfig>;
  modalRef: BsModalRef;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute, private datePipe: DatePipe, private modalService: BsModalService) {
    this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  public userdetail: UserDetail = {
    userMstID: null,
    firstName: null,
    middleName: null,
    lastName: null,
    dob: null,
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

  public genderLst: DropDownList[] = [
    new DropDownList(1, 'Male'),
    new DropDownList(2, 'Female')
  ];
  public profilelst: DropDownList[] = [
    new DropDownList(1, 'UserProfile'),
    new DropDownList(2, 'Profile')
  ];

  public terminalst: DropDownList[] = [
    new DropDownList(1, 'Delhi'),
    new DropDownList(2, 'Banglore'),
    new DropDownList(3, 'Mumbai')
  ];

  ngOnInit() {
    this.getOwnerById();
  }

  private getOwnerById() {
    const userMstID: number = this.activeRoute.snapshot.params['id'];

    const userByIdUrl = `api/UserCreation/${userMstID}`;

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.userdetail = res as UserDetail;
        if (this.userdetail.gender == 'M') {
          this.userdetail.gender = '1';
        } else {
          this.userdetail.gender = '2';
        }

        const SelectedTerminal: string = this.userdetail.p1;
        switch (SelectedTerminal) {
          case 'DEL':
            this.userdetail.p1 = '1';
            break;
          case 'BLR':
            this.userdetail.p1 = '2';
            break;
          case 'BOM':
            this.userdetail.p1 = '3';
            break;
        }
        this.userdetail.dob = this.datePipe.transform(this.userdetail.dob, 'dd/MM/yyyy');
        this.userdetail.userMstID = userMstID;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public UpdateUser(form: NgForm, template: TemplateRef<any>) {
    if (form.invalid) {
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    const SelectedTerminal: string = form.value.P1;
    let TerminalCode: string;
    switch (SelectedTerminal) {
      case '1':
        TerminalCode = 'DEL';
        break;
      case '2':
        TerminalCode = 'BLR';
        break;
      case '3':
        TerminalCode = 'BOM';
        break;
    }
    let user: UserDetail = {
      userMstID: this.userdetail.userMstID,
      firstName: form.value.firstName,
      middleName: form.value.middleName,
      lastName: form.value.lastName,
      dob: form.value.DOB,
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
      loginMId: this.userdetail.loginMId,
      password: null,
      activeStatus: form.value.activeStatus == true ? 'Y' : 'N',
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
    this.repository.update(apiUrl, user)
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
    this.router.navigate(['/home/usercreation/list']);
  }
}
