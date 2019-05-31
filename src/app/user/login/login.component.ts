import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { Cookie} from 'ng2-cookies'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email;
  public password;

  constructor(
    private http: HttpService,  
    private toastr: ToastrManager,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  public loginUser: any = ()=>{
    let data = {
      email: this.email,
      password: this.password
    }
    
    this.http.loginFunction(data).subscribe(
      (apiResponse)=>{
        if(apiResponse.status === 200){
          this.toastr.successToastr('Login Successful')

          Cookie.set('authToken', apiResponse.data.authToken)
          Cookie.set('fullName', apiResponse.data.userDetails.firstName+' '+apiResponse.data.userDetails.lastName)
          Cookie.set('userId', apiResponse.data.userDetails.userId)

          this.http.setUserInfoToLocalStorage(apiResponse.data)
          this.spinner.show()
          setTimeout(()=>{
            this.router.navigate(['/dashboard'])
            this.spinner.hide()
          }, 2000)
        } else{
          this.toastr.warningToastr(apiResponse.message)
        }
      },
      (err)=>{
        console.log(err)
        this.toastr.errorToastr(err.error.message)
      }
    )
  } // end login user 

  
}

 