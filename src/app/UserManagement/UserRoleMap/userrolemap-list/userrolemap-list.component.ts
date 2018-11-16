import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../shared/services/repository.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { VsecRoleMst } from '../../../_interfaces/UserManagement/vsecRoleMst.modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropDownList } from '../../../_interfaces/dropdownlist.model';

@Component({
  selector: 'app-userrolemap-list',
  templateUrl: './userrolemap-list.component.html',
  styleUrls: ['./userrolemap-list.component.css']
})
export class UserrolemapListComponent implements OnInit {

  public errorMessage = '';
  vsecRoleMst: VsecRoleMst[];
  // UserRoleMapModal: UserRoleMap = new UserRoleMap();
  selectedOption: VsecRoleMst;
  formUserRoleMapGroup: FormGroup = null;

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

  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private fb: FormBuilder) { }

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
}
