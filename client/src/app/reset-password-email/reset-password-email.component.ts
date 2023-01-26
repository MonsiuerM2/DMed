import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.css'],
})
export class ResetPasswordEmailComponent implements OnInit {
  model: any = {};
  @Output() cancelResetPasswordEmail = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  cancel() {
    console.log('1');
    this.cancelResetPasswordEmail.emit(false);
    console.log('2');
  }

  resetPasswordEmail() {
    if (
      this.model.username == '' ||
      this.model.email == '' ||
      this.model.username == undefined ||
      this.model.email == undefined
    ) {
      this.toastr.error('All fields are required');
      return;
    }
    
    this.accountService.resetPasswordLink(this.model).subscribe({
      next: (response) => {
        this.toastr.info(), console.log('RVL: ', response);
      },
      error: (error) => {
        if (error.status == 200) {
          this.toastr.info(error.error.text);
        } else {
          this.toastr.error(error.error), console.log(error);
        }
      },
    });
  }
}
