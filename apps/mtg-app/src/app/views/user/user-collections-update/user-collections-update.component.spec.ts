import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollectionsUpdateComponent } from './user-collections-update.component';

describe('UserCollectionsUpdateComponent', () => {
  let component: UserCollectionsUpdateComponent;
  let fixture: ComponentFixture<UserCollectionsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCollectionsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCollectionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
