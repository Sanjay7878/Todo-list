import { async, TestBed } from '@angular/core/testing';
import { FriendRequestsComponent } from './friend-requests.component';
describe('FriendRequestsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FriendRequestsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FriendRequestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=friend-requests.component.spec.js.map