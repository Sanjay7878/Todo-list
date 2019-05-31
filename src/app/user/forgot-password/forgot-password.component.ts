import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public userId
  public password;
  public confirmPassword;

  constructor(
    private http: HttpService, 
    private toastr: ToastrManager, 
    private _route: ActivatedRoute, 
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.userId = this._route.snapshot.paramMap.get('userId')
  }

  public resetPassword: any = ()=>{
    if(!this.password){
      this.toastr.warningToastr('Please Provide a Password')
    }else if(!this.confirmPassword){
      this.toastr.warningToastr('Please Provide a Confirmation Password')
    }else if(this.password !== this.confirmPassword){
      this.toastr.errorToastr('Password Does not match')
    } else {
      let data = {
        userId: this.userId,
        password: this.password
      }

      this.http.resetForgotPassword(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr("Password Reset Successful")
            this.spinner.show()
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 2000);
          }
        }
      )
    }
  } // end reset password
}
