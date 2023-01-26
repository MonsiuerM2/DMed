import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.css'],
})
export class ResendEmailComponent implements OnInit {
  model: any = {};
  resendEmailMode = false;
  rPrE: string = '';
  @Output() cancelResemdEmail = new EventEmitter();

  constructor(
    public accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  cancel() {
    console.log('1');
    this.cancelResemdEmail.emit(false);
    console.log('2');
  }

  resendVerificationLink() {
    if (
      this.model.username == '' ||
      this.model.email == '' ||
      this.model.username == undefined ||
      this.model.email == undefined
    ) {
      this.toastr.error('Both fields are required');
    } else {
      this.accountService.resendVerificationLink(this.model).subscribe({
        next: (response) => {
          this.toastr.info('Verefication Email has been resent.'),
            console.log('RVL: ', response);
        },
        error: (error) => {
          if (error.status == 200) {
            this.toastr.info(error.error.text);
            console.log(error);
          } else {
            this.toastr.error(error.error), console.log(error);
          }
        },
      });
    }
  }
}
