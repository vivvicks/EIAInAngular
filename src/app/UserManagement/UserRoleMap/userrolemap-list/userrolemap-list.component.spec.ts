import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolemapListComponent } from './userrolemap-list.component';

describe('UserrolemapListComponent', () => {
  let component: UserrolemapListComponent;
  let fixture: ComponentFixture<UserrolemapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrolemapListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrolemapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
