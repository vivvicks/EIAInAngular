import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIComponent } from './form-i.component';

describe('FormIComponent', () => {
  let component: FormIComponent;
  let fixture: ComponentFixture<FormIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
