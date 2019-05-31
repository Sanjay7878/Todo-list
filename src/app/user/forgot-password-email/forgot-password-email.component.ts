import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.css']
})
export class ForgotPasswordEmailComponent implements OnInit {

  constructor(private http: HttpService, private spinner: NgxSpinnerService, private router: Router, private toastr: ToastrManager) { }

  public email
  ngOnInit() {
  }

  public sendForgotPassword: any = () =>{
    let email = this.email.toLowerCase()
    this.http.forgotPasswordLink(email).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr('Email has been Sent with the Password-reset Link')
          setTimeout(()=>{
            this.router.navigate(['/passwordLink-notification'])
          }, 2000)
        } else {
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr('Some Error Occured')
      }
    )
  } // end forgot password

}
