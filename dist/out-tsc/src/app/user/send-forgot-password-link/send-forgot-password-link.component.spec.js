import { async, TestBed } from '@angular/core/testing';
import { SendForgotPasswordLinkComponent } from './send-forgot-password-link.component';
describe('SendForgotPasswordLinkComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SendForgotPasswordLinkComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SendForgotPasswordLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=send-forgot-password-link.component.spec.js.map