import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};
  confirmPassword: string = '';
  token: string = '';

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //const params = new URLSearchParams(window.location.search);
    //this.token = params.get('token') || '';
  }

  resetPassword() {
    const params = new URLSearchParams(window.location.search);
    this.token = params.get('token') || '';

    if (
      this.model.username == '' ||
      this.model.username == undefined ||
      this.model.password == '' ||
      this.model.password == undefined ||
      this.confirmPassword == '' ||
      this.confirmPassword == undefined
    ) {
      this.toastr.error('Both fields are required');
    }

    if (this.confirmPassword != this.model.password) {
      this.toastr.error('Password and comfirm password are not the same');
      return;
    }

    this.model.token = this.token;

    this.accountService.resetPassword(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/login'),
          this.toastr.info('Password has been reset successfully');
      },
      error: (error) => {
        if (error.status == 200) {
          this.toastr.info(error.error.text);
        }
      },
    });
  }
}
