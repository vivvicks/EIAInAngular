import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { VsecRoleMst } from '../../../_interfaces/UserManagement/vsecRoleMst.modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropDownList } from '../../../_interfaces/dropdownlist.model';
import { UserDetail } from 'src/app/_interfaces/UserManagement/VWUserDetail.modal';
import { VsecUserRoleMap } from 'src/app/_interfaces/UserManagement/VsecUserRoleMap.modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { GlobalValue } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-userrolemap-list',
  templateUrl: './userrolemap-list.component.html',
  styleUrls: ['./userrolemap-list.component.css']
})
export class UserrolemapListComponent implements OnInit {

  public errorMessage = '';
  vsecRoleMst: VsecRoleMst[];
  vwUserDetail: UserDetail[];
  selectedOption: VsecRoleMst;
  formUserRoleMapGroup: FormGroup = null;
  public selectedStatus = '';
  p: number = 1;
  itemsPerPage: DropDownList = new DropDownList(1, '5');
  perpage: number = +this.itemsPerPage.name;
  AllocateFlag = false;
  DeAllocateFlag = false;
  public checkedList = [];
  roleMapList: Array<VsecUserRoleMap> = [];
  modalRef: BsModalRef;

  public statusLst: DropDownList[] = [
    new DropDownList(1, 'Available'),
    new DropDownList(2, 'Allocated')
  ];

  formErrors = {
    'customSelectedControl': '',
    'statusSelectedControl': ''
  };


  validationMessages = {
    'customSelectedControl': {
      'required': 'customSelectedControl is required.'
    },
    'statusSelectedControl': {
      'required': 'statusSelectedControl is required.'
    }
  };

  itemsPerPages = [
    new DropDownList(1, '5'),
    new DropDownList(2, '10'),
    new DropDownList(3, '20'),
    new DropDownList(4, '30'),
    new DropDownList(5, '40'),
    new DropDownList(6, '50')
  ];


  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private globalValue: GlobalValue) { }

  ngOnInit() {
    this.buildForm();
    this.GetAllRoles();
  }

  public GetAllRoles() {
    this.repository.getData('api/RoleCreation/GetAllRoles')
      .subscribe(response => {
        this.vsecRoleMst = response as VsecRoleMst[];
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  buildForm(): void {
    this.formUserRoleMapGroup = this.fb.group({
      'customSelectedControl': ['', Validators.required],
      'statusSelectedControl': ['', Validators.required]
    });

    this.formUserRoleMapGroup.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.formUserRoleMapGroup) { return; }
    const form = this.formUserRoleMapGroup;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  public GetAllMappedRolesUsers() {
    // const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    // tslint:disable-next-line:max-line-length
    this.repository.getData('api/UserRoleMap/GetRoleMapUsers?roleID=' + this.selectedOption.roleId + '&Status=' + this.selectedStatus + '&TerminalCode=' + this.globalValue.getGV().terminalCode)
      .subscribe(response => {
        this.vwUserDetail = response as UserDetail[];
        if (this.selectedStatus === 'Allocated') {
          this.AllocateFlag = false;
          this.DeAllocateFlag = true;
        } else {
          this.AllocateFlag = true;
          this.DeAllocateFlag = false;
        }
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  getSelectedOptionText(event: Event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    this.selectedStatus = selectedOptions[selectedIndex].text;
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

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.checkedList.push(option.loginMId);
    } else {
      for (let i = 0; i < this.vwUserDetail.length; i++) {
        if (this.checkedList[i] === option.loginMId) {
          this.checkedList.splice(i, 1);
        }
      }
    }
  }

  public Allocate(template) {
    // const currentUser = JSON.parse(localStorage.getItem('UserInfo'));

    for (let i = 0; i < this.checkedList.length; i++) {
      let roleMapObj = new VsecUserRoleMap();
      roleMapObj.LoginMid = this.checkedList[i];
      roleMapObj.RoleId = this.selectedOption.roleId;
      if (this.AllocateFlag == true) {
       roleMapObj.Status =  'Y';
      } else {
        roleMapObj.Status =  'N';
      }
      roleMapObj.CreatedBy = this.globalValue.getGV().loginID;
      this.roleMapList.push(roleMapObj);
    }

    let apiUrl = 'api/UserRoleMap';
    this.repository.create(apiUrl, this.roleMapList)
      .subscribe(res => {
        this.modalRef = this.modalService.show(template);
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  public redirectToRoleList() {
    this.modalRef.hide();
    this.router.navigate(['/home/userrolemap/list']);
  }
}

