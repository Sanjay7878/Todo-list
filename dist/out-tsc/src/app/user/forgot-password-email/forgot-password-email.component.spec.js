import { async, TestBed } from '@angular/core/testing';
import { ForgotPasswordEmailComponent } from './forgot-password-email.component';
describe('ForgotPasswordEmailComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ForgotPasswordEmailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ForgotPasswordEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=forgot-password-email.component.spec.js.map