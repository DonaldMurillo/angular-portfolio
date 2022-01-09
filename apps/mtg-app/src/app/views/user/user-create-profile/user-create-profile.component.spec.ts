import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateProfileComponent } from './user-create-profile.component';

describe('UserCreateProfileComponent', () => {
  let component: UserCreateProfileComponent;
  let fixture: ComponentFixture<UserCreateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
