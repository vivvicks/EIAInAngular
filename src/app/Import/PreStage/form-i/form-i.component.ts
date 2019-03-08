import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { MFlightmasterMst } from 'src/app/_interfaces/Import/MFlightmasterMST.model';

@Component({
  selector: 'app-form-i',
  templateUrl: './form-i.component.html',
  styleUrls: ['./form-i.component.css']
})
export class FormIComponent implements OnInit {
  public errorMessage = '';
  form1Group: FormGroup = null;
  MFlightmasterMst: MFlightmasterMst[];
  selectedOption: MFlightmasterMst;
  formErrors: any;
  validationMessages: any;

  constructor(private fb: FormBuilder,
              private repository: RepositoryService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.buildForm();
    this.GetFlightLst();
  }

  buildForm(): void {
    this.form1Group = this.fb.group({
      'flightNumberControl': ['', Validators.required]
    });

    this.form1Group.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.form1Group) { return; }
    const form = this.form1Group;

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

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  public GetFlightLst() {
    const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    // tslint:disable-next-line:max-line-length
    this.repository.getData('api/Utility/getFlightLst?terminalCode=' + currentUser.UserInfo[0].terminalCode + '&airlineCode=' + '' + '&flightType=I')
      .subscribe(response => {
        this.MFlightmasterMst = response as MFlightmasterMst[];
        console.log(this.MFlightmasterMst);
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }
}
