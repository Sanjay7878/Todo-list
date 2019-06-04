import { async, TestBed } from '@angular/core/testing';
import { SentNotificationsComponent } from './sent-notifications.component';
describe('SentNotificationsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SentNotificationsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SentNotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=sent-notifications.component.spec.js.map