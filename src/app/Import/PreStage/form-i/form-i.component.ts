import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { MFlightmasterMst, GetFlightDetails, MCourierMst, GetForm1CheckStatus } from 'src/app/_interfaces/Import/MFlightmasterMST.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  getFlightDetails: GetFlightDetails[];
  datePickerConfig: Partial<BsDatepickerConfig>;
  dateOfArrival = new Date();
  igmDate = new Date();
  MCourierMst: MCourierMst[];
  selectedOption1: MCourierMst;
  modalRef: BsModalRef;
  GetForm1CheckStatus: GetForm1CheckStatus[];
  public IGMFlightNumber = '';
  public IGMFlightDate = '';
  public IGMTOA: string;
  public IGMNumber = '';
  public IGMDate = '';
  submitted = false;

  constructor(private fb: FormBuilder,
              private repository: RepositoryService,
              private errorHandler: ErrorHandlerService,
              private modalService: BsModalService) {
                this.datePickerConfig = Object.assign({},
                  {
                    dateInputFormat: 'DD/MM/YYYY'
                  });
              }

  ngOnInit() {
    this.buildForm();
    this.GetFlightLst();
    this.GetCourierLst();
  }

  buildForm(): void {
    this.form1Group = this.fb.group({
      'flightNumberControl': ['', Validators.required],
      'courierNameControl': ['', Validators.required],
      'airlineName' : [''],
      'AirportOfShipment' : [''],
      'AirportOfArrival' : [''],
      'hrs': [''],
      'min': [''],
      'IGMNoControl': ['', Validators.required],
      'MAWBNoControl': ['', Validators.required],
      'DateOfArrivalControl' : [new Date(), Validators.required],
      'IgmDateControl': [new Date(), Validators.required],
      'NumberOfPackagesControl': ['', Validators.required],
      'weightControl': ['', Validators.required],
      'ActualNumberControl': [''],
      'ActualWeightControl': [''],
      'ULDNumberControl': ['', Validators.required],
      'CoLoaderControl': ['']
    });

    // this.form1Group.valueChanges.subscribe(data => this.onValueChanged(data));
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

  get f() { return this.form1Group.controls; }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    // console.log(this.selectedOption);
    this.MFlightmasterMst = this.MFlightmasterMst.filter(s => s.airlineCode === this.selectedOption.airlineCode);
    // console.log(this.MFlightmasterMst[0].flightNumber);
    this.GetFlightDetails(this.MFlightmasterMst[0].flightNumber);
  }

  onCourierSelect(event: TypeaheadMatch): void {
    this.selectedOption1 = event.item;
  }

  public GetFlightLst() {
    const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    // tslint:disable-next-line:max-line-length
    this.repository.getData('api/Utility/getFlightLst?terminalCode=' + currentUser.UserInfo[0].terminalCode + '&airlineCode=' + '' + '&flightType=I')
      .subscribe(response => {
        this.MFlightmasterMst = response as MFlightmasterMst[];
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });
    }

  public GetFlightDetails(FlightNumber: string) {
    const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
    this.repository.getData('api/Utility/GetFlightDetails?FlightNumber=' + FlightNumber
    + '&terminalCode=' + currentUser.UserInfo[0].terminalCode )
      .subscribe(response => {
        this.getFlightDetails = response as GetFlightDetails[];
        this.form1Group.patchValue({
          airlineName: this.getFlightDetails[0].airlineName,
          AirportOfShipment: this.getFlightDetails[0].airportofDeparture,
          AirportOfArrival: this.getFlightDetails[0].airportofDestination,
          hrs: this.getFlightDetails[0].eta.substr(0, 2),
          min: this.getFlightDetails[0].eta.substr(2, 4),
          MAWBNoControl: this.getFlightDetails[0].airlineAccountingPrefix
        });

      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      });

  }

  public GetCourierLst() {
    const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
     this.repository.getData('api/Utility/GetCourierLst?terminalCode=' + currentUser.UserInfo[0].terminalCode )
      .subscribe(response => {
        this.MCourierMst = response as MCourierMst[];
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.submitted = true;

    if (this.form1Group.controls.IGMNoControl.invalid) {
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('UserInfo'));
     this.repository.getData('api/Form1/GetIGMDetails?IGMNumber=' + this.form1Group.controls['IGMNoControl'].value
                                                                  + '&MAWBNumber=' + this.form1Group.controls['MAWBNoControl'].value
                                                                  + '&terminalCode=' +  currentUser.UserInfo[0].terminalCode)
      .subscribe(response => {
        this.GetForm1CheckStatus = response as GetForm1CheckStatus[];
        this.IGMFlightNumber = this.GetForm1CheckStatus[0].flightNumber;
        this.IGMFlightDate = this.GetForm1CheckStatus[0].dateOfArrival;
        this.IGMTOA = this.GetForm1CheckStatus[0].timeOfArrival.toString().substr(0, 2)
                      + ':' + this.GetForm1CheckStatus[0].timeOfArrival.toString().substr(2, 4);
        this.IGMNumber = this.GetForm1CheckStatus[0].igmNo;
        this.IGMDate = this.GetForm1CheckStatus[0].igmDate;
        this.modalRef = this.modalService.show(template);
      }, err => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  Add() {
    this.submitted = true;

    if (this.form1Group.invalid) {
      return;
    }

  }

}
