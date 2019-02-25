import { Component, OnInit } from '@angular/core';
import { DropDownList } from 'src/app/_interfaces/dropdownlist.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { VWEDTCOURIERMST } from 'src/app/_interfaces/Masters/VWEDTCOURIERMST';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-courier-list',
  templateUrl: './courier-list.component.html',
  styleUrls: ['./courier-list.component.css']
})
export class CourierListComponent implements OnInit {
  p: number = 1;
  public errorMessage = '';
  itemsPerPage: DropDownList = new DropDownList(1, '5');
  perpage: number = +this.itemsPerPage.name;
  public CourierType: any;
  public MemberType: any;
  vWEDTCOURIERMST: VWEDTCOURIERMST[];
  formCourierGroup: FormGroup = null;

  constructor(private repository: RepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private fb: FormBuilder) { }

  itemsPerPages = [
    new DropDownList(1, '5'),
    new DropDownList(2, '10'),
    new DropDownList(3, '20'),
    new DropDownList(4, '30'),
    new DropDownList(5, '40'),
    new DropDownList(6, '50')
  ];

  ngOnInit() {
    this.CourierType();
    this.GetMemberType();
  }

  selectChangeHandler(id) {
    this.itemsPerPage = null;
    this.perpage = null;
    for (let i = 0; i < this.itemsPerPages.length; i++) {
      {
        if (this.itemsPerPages[i].id == id) {
          this.itemsPerPage = this.itemsPerPages[i];
        }
      }
    }
    this.perpage = +this.itemsPerPage.name;
  }

  buildForm(): void {
    this.formCourierGroup = this.fb.group({
      'CouriercompanynameControl': [''],
      'CouriercompanycodeControl': [''],
      'MemberTypeControl': [''],
      'CouriertypeControl': ['']
    });
  }

  GetCourierType() {
    this.repository.getData('api/Utility/GetCourierType')
          .subscribe(response => {
            this.CourierType = response;
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  GetMemberType() {
    this.repository.getData('api/Utility/GetMemberType')
          .subscribe(response => {
            this.MemberType = response;
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public SearchCourier(RoleFormValue) {
    this.GetAllCourier(RoleFormValue);
  }

  public GetAllCourier(RoleFormValue) {
    const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    // tslint:disable-next-line:max-line-length
    this.repository.getData('api/RoleCreation/GetAllRoles?curName=' + RoleFormValue.CouriercompanynameControl + '&curCode=' + RoleFormValue.CouriercompanycodeControl + '&TerminalCode=' + currentUser.UserInfo[0].terminalCode)
      .subscribe(response => {
        this.vWEDTCOURIERMST = response as VWEDTCOURIERMST[];
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

}
