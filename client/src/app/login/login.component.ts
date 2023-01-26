import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  resendEmailMode = false;
  rPrE: any = 1;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    //console.log(this.model);
    if (
      this.model.username == '' ||
      this.model.password == '' ||
      this.model.username == undefined ||
      this.model.password == undefined
    ) {
      this.toastr.error('Both fields are required');
    } else {
      this.accountService.login(this.model).subscribe({
        next: () => this.router.navigateByUrl('/cars'),
        //error: (error) => {
        //  this.toastr.error(error.error), console.log(error);
        //},
      });
    }
  }

  operationToggle(operation: any) {
    this.rPrE = operation;
  }

  cancelMode(event: boolean) {
    console.log('3');
    this.rPrE = 1;
  }

  cancelMode2(event: boolean) {
    console.log('4');
    this.rPrE = 1;
  }
}
