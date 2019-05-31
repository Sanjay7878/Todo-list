import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendForgotPasswordLinkComponent } from './send-forgot-password-link.component';

describe('SendForgotPasswordLinkComponent', () => {
  let component: SendForgotPasswordLinkComponent;
  let fixture: ComponentFixture<SendForgotPasswordLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendForgotPasswordLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendForgotPasswordLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
