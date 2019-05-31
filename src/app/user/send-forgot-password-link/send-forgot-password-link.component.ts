import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-forgot-password-link',
  templateUrl: './send-forgot-password-link.component.html',
  styleUrls: ['./send-forgot-password-link.component.css']
})
export class SendForgotPasswordLinkComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  
  public resendEmail: any = ()=>{
    this.router.navigate(['/forgot-password-email'])
  } // end resent email
}
