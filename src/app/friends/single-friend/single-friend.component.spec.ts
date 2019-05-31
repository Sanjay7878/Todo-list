import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFriendComponent } from './single-friend.component';

describe('SingleFriendComponent', () => {
  let component: SingleFriendComponent;
  let fixture: ComponentFixture<SingleFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
